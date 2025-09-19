import express from "express";
import { validate } from "../middleware/validate";
import {
  registerValidateSchema,
  loginValidateSchema,
} from "../validate/user.validate";
import {
  loginUserController,
  registerUser,
} from "../controllers/user.controller";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication APIs
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with name, email, password, and role.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass@123
 *               role:
 *                 type: string
 *                 description: MongoDB ObjectId of role
 *                 example: 64fd9adf12e5b7b234a1c098
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *                   example: User registered successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     role:
 *                       type: string
 *                       example: Admin
 *       400:
 *         description: User already exists or validation failed
 *       500:
 *         description: Internal server error
 */

userRouter.post(
  "/register",
  validate({ body: registerValidateSchema }),
  registerUser
);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login user
 *     description: Logs in a user and returns a JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass@123
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                   example: User logged in successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 68cab3172f18c374b7041cdf
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         email:
 *                           type: string
 *                           example: johndoe@gmail.com
 *                         role:
 *                           type: string
 *                           example: User
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
userRouter.post(
  "/login",
  validate({ body: loginValidateSchema }),
  loginUserController
);
export default userRouter;