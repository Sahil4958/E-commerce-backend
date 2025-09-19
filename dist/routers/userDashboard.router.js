"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const userDashboard_controller_1 = require("../controllers/userDashboard.controller");
const userDashboardRouter = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: fail
 *         message:
 *           type: string
 *           example: Something went wrong
 *         data:
 *           type: array
 *           items:
 *             type: string
 *           example: []
 */
/**
 * @swagger
 * /api/v1/user/orders:
 *   get:
 *     tags:
 *       - User Dashboard
 *     summary: Get all orders of the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: User orders fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66eac17c89c70d2a4c4fdcde
 *                       totalAmount:
 *                         type: number
 *                         example: 999.99
 *                       status:
 *                         type: string
 *                         example: placed
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized (user not logged in)
 */
userDashboardRouter.get("/orders", auth_middleware_1.authMiddleware, userDashboard_controller_1.getUserOrders);
/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     tags:
 *       - User Dashboard
 *     summary: Get logged-in user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: User profile fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 */
userDashboardRouter.get("/profile", auth_middleware_1.authMiddleware, userDashboard_controller_1.getUserProfile);
/**
 * @swagger
 * /api/v1/user/profile/profile:
 *   patch:
 *     tags:
 *       - User Dashboard
 *     summary: Update logged-in user's profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
userDashboardRouter.patch("/profile", auth_middleware_1.authMiddleware, userDashboard_controller_1.updateUserProfile);
exports.default = userDashboardRouter;
