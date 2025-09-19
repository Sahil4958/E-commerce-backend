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

/**
 * @swagger
 * /api/v1/carts/cart:
 *   get:
 *     summary: Get the logged-in user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Cart fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                           qty:
 *                             type: number
 *                           price:
 *                             type: number
 */

cartRouter.get("/cart", authMiddleware, getMyCart);

/**
 * @swagger
 * /api/v1/carts/cart/add:
 *   post:
 *     summary: Add a product to the logged-in user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 68cbb7ac588e5c9c7636907d
 *               qty:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Item added to cart successfully
 *                 data:
 *                   type: object
 */

cartRouter.post(
  "/cart/add",
  authMiddleware,
  validate({ body: addToCartBody }),
  addToCart
);

/**
 * @swagger
 * /api/v1/carts/cart/qty:
 *   patch:
 *     summary: Update the quantity of a product in the cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 68cbb7ac588e5c9c7636907d
 *               qty:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Cart updated
 *                 data:
 *                   type: object
 */

cartRouter.patch(
  "/cart/qty",
  authMiddleware,
  validate({ body: updateQtyBody }),
  updateCartItemQty
);

/**
 * @swagger
 * /api/v1/carts/cart/item:
 *   delete:
 *     summary: Remove a specific product from the cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 68cbb7ac588e5c9c7636907d
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Item removed from cart
 *                 data:
 *                   type: object
 */

cartRouter.delete(
  "/cart/item",
  authMiddleware,
  validate({ body: removeItemBody }),
  removeFromCart
);

/**
 * @swagger
 * /api/v1/carts/cart:
 *   delete:
 *     summary: Clear all items from the logged-in user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Cart cleared
 *                 data:
 *                   type: object
 */

cartRouter.delete("/cart", authMiddleware, clearCart);

export default cartRouter;
