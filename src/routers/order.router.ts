import { Router } from "express";
import {
  checkoutFromCart,
  getOrder,
  getMyOrders,
  updateOrder,
  cancelOrder,
  listOrderedProducts,
  totalExpenses,
} from "../controllers/order.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate";
import {
  checkoutBody,
  updateOrderBody,
  expensesQuery,
} from "../validate/order.validate";

const orderRouter = Router();

orderRouter.post(
  "/checkout",
  authMiddleware,
  validate({ body: checkoutBody }),
  checkoutFromCart
);

orderRouter.get("/:id", authMiddleware, getOrder);
orderRouter.get("/orders", authMiddleware, getMyOrders);

orderRouter.patch(
  "/:id",
  authMiddleware,
  validate({ body: updateOrderBody }),
  updateOrder
);

orderRouter.delete("/:id", authMiddleware, cancelOrder);

orderRouter.get("/products", authMiddleware, listOrderedProducts);
orderRouter.get(
  "/expenses",
  authMiddleware,
  validate({ query: expensesQuery }),
  totalExpenses
);

export default orderRouter;
