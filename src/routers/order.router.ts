import { authorization } from "./../middleware/adminValidate.middleware";
import express from "express";
import {
  checkoutFromCart,
  getOrder,
  getMyOrders,
  updateOrder,
  cancelOrder,
  listOrderedProducts,
  totalExpenses,
  updateOrderStatus,
} from "../controllers/order.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate, validateQuery } from "../middleware/validate";
import {
  checkoutBody,
  updateOrderBody,
  expensesQuery,
  updateOrderStatusBody,
} from "../validate/order.validate";

const orderRouter = express.Router();

/**
 * @swagger
 * /api/v1/orders/checkout:
 *   post:
 *     summary: Place an order from the user's cart
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: object
 *                 properties:
 *                   line1:
 *                     type: string
 *                   line2:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zip:
 *                     type: string
 *                   country:
 *                     type: string
 *               shippingMethod:
 *                 type: string
 *                 enum: [standard, express]
 *                 default: standard
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

orderRouter.post(
  "/checkout",
  authMiddleware,
  validate({ body: checkoutBody }),
  checkoutFromCart
);

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders of the authenticated user
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 */

orderRouter.get("/", authMiddleware, getMyOrders);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   patch:
 *     tags:
 *       - Orders
 *     summary: "Update order details (user can update allowed fields, not status)"
 *     description: "Users can update order fields like address, shipping method, notes. Status cannot be updated by regular users."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "Order ID"
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderBody'
 *     responses:
 *       '200':
 *         description: "Order updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       '403':
 *         description: "Forbidden - trying to update status as non-admin"
 *       '404':
 *         description: "Order not found"
 */

orderRouter.patch(
  "/:id",
  authMiddleware,
  validate({ body: updateOrderBody }),
  updateOrder
);
/**
 * @swagger
 * /api/v1/orders/status/{id}:
 *   patch:
 *     tags:
 *       - Orders
 *     summary: "Update order status (admin only)"
 *     description: "Only admin users can update the status of an order."
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: "Order ID"
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderStatusBody'
 *     responses:
 *       '200':
 *         description: "Order status updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       '403':
 *         description: "Forbidden - Only admin can update status"
 *       '404':
 *         description: "Order not found"
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     UpdateOrderBody:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - placed
 *             - shipped
 *             - delivered
 *             - cancelled
 *           description: "Cannot be updated by user"
 *         expectedDelivery:
 *           type: string
 *           format: date
 *         extra:
 *           type: object
 *           properties:
 *             address:
 *               type: object
 *               properties:
 *                 line1: { type: string }
 *                 line2: { type: string }
 *                 city: { type: string }
 *                 state: { type: string }
 *                 zip: { type: string }
 *                 country: { type: string }
 *             shippingMethod:
 *               type: string
 *               enum: [standard, express]
 *             notes:
 *               type: string
 *
 *     UpdateOrderStatusBody:
 *       type: object
 *       required: [status]
 *       properties:
 *         status:
 *           type: string
 *           enum: [placed, shipped, delivered, cancelled]
 *
 *     OrderResponse:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         user: { type: string }
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product: { type: string }
 *               qty: { type: integer }
 *               price: { type: number }
 *         totalAmount: { type: number }
 *         status: { type: string }
 *         expectedDelivery: { type: string, format: date }
 *         extra:
 *           type: object
 *           properties:
 *             address: { type: object }
 *             shippingMethod: { type: string }
 *             notes: { type: string }
 *         createdAt: { type: string, format: date-time }
 */

orderRouter.patch(
  "/status/:id",
  authMiddleware,
  authorization,
  validate({ body: updateOrderStatusBody }),
  updateOrderStatus
);
/**
 * @swagger
 * /api/v1/orders/products:
 *   get:
 *     summary: List all ordered products for the logged-in user
 *     description: Returns all products that the user has ordered.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of ordered products
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: "Ordered products"
 *               data:
 *                 - product:
 *                     _id: "64f2a5b2e1f2a4c123456789"
 *                     name: "Product A"
 *                     price: 500
 *                   qty: 2
 *                   price: 500
 */

orderRouter.get("/products", authMiddleware, listOrderedProducts);
/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     summary: Cancel an order
 *     description: Cancel an order before its expected delivery date.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID to cancel
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: "Order cancelled"
 *               data:
 *                 _id: "64f2a5b2e1f2a4c123456789"
 *                 status: "cancelled"
 *       404:
 *         description: Order not found
 *       400:
 *         description: Cannot cancel after expected delivery
 */
orderRouter.delete("/:id", authMiddleware, cancelOrder);

/**
 * @swagger
 * /api/v1/orders/expenses:
 *   get:
 *     summary: Get total expenses of the user
 *     description: Returns the total amount spent by the user in orders. Optionally filter by date range.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date to filter orders
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date to filter orders
 *     responses:
 *       200:
 *         description: Total expenses fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: "Total expenses"
 *               data:
 *                 total: 1500
 *                 from: "2025-09-01T00:00:00.000Z"
 *                 to: "2025-09-17T23:59:59.999Z"
 */

orderRouter.get(
  "/expenses",
  authMiddleware,
  validateQuery(expensesQuery),
  totalExpenses
);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get a specific order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */

orderRouter.get("/:id", authMiddleware, getOrder);

export default orderRouter;
