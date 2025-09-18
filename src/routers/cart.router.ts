import express from "express";
import {
  getMyCart,
  addToCart,
  updateCartItemQty,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import {
  addToCartBody,
  updateQtyBody,
  removeItemBody,
} from "../validate/cart.validation";

const cartRouter = express.Router();

cartRouter.get("/cart", authMiddleware, getMyCart);

cartRouter.post(
  "/cart/add",
  authMiddleware,
  validate({ body: addToCartBody }),
  addToCart
);

cartRouter.patch(
  "/cart/qty",
  authMiddleware,
  validate({ body: updateQtyBody }),
  updateCartItemQty
);

cartRouter.delete(
  "/cart/item",
  authMiddleware,
  validate({ body: removeItemBody }),
  removeFromCart
);

cartRouter.delete("/cart", authMiddleware, clearCart);

export default cartRouter;
