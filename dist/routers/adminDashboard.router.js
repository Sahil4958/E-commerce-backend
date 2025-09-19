"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const adminValidate_middleware_1 = require("../middleware/adminValidate.middleware");
const adminDashboard_controller_1 = require("../controllers/adminDashboard.controller");
const adminDashboardRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/v1/admin/metrics:
 *   get:
 *     summary: Get global dashboard metrics
 *     description: Returns total revenue, total orders, total products, and total users for the admin dashboard.
 *     tags: [Admin Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Global metrics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Global metrics
 *                 data:
 *                   type: object
 *                   properties:
 *                     revenue:
 *                       type: number
 *                       example: 52000
 *                     orders:
 *                       type: integer
 *                       example: 140
 *                     products:
 *                       type: integer
 *                       example: 30
 *                     users:
 *                       type: integer
 *                       example: 220
 *       401:
 *         description: Unauthorized
 */
adminDashboardRouter.get("/metrics", auth_middleware_1.authMiddleware, adminValidate_middleware_1.authorization, adminDashboard_controller_1.getGlobalMetrics);
/**
 * @swagger
 * /api/v1/admin/sales:
 *   get:
 *     summary: Get sales report
 *     description: Returns daily sales revenue and order counts between given date range.
 *     tags: [Admin Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Sales report fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Sales report
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                       revenue:
 *                         type: number
 *                       orders:
 *                         type: integer
 *       401:
 *         description: Unauthorized
 */
adminDashboardRouter.get("/sales", auth_middleware_1.authMiddleware, adminValidate_middleware_1.authorization, adminDashboard_controller_1.getSalesReport);
/**
 * @swagger
 * /api/v1/admin/order-statuses:
 *   get:
 *     summary: Get order status summary
 *     description: Returns total number of orders and revenue grouped by their current status.
 *     tags: [Admin Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order statuses fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Order statuses
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                         example: placed
 *                       count:
 *                         type: integer
 *                         example: 12
 *                       amount:
 *                         type: number
 *                         example: 120000
 *       401:
 *         description: Unauthorized
 */
adminDashboardRouter.get("/order-statuses", auth_middleware_1.authMiddleware, adminValidate_middleware_1.authorization, adminDashboard_controller_1.getOrderStatuses);
/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users
 *     description: Fetch all registered users (excluding their passwords).
 *     tags: [Admin Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Users fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                         example: user
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 */
adminDashboardRouter.get("/users", auth_middleware_1.authMiddleware, adminValidate_middleware_1.authorization, adminDashboard_controller_1.listAllUsers);
/**
 * @swagger
 * /api/v1/admin/products:
 *   get:
 *     summary: Get all products
 *     description: Fetch all available products (excluding deleted ones).
 *     tags: [Admin Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Products fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       stock:
 *                         type: number
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       category:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 */
adminDashboardRouter.get("/products", auth_middleware_1.authMiddleware, adminValidate_middleware_1.authorization, adminDashboard_controller_1.listAllProducts);
exports.default = adminDashboardRouter;
