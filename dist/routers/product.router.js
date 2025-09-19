"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_validate_1 = require("./../validate/product.validate");
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middleware/validate");
const auth_middleware_1 = require("../middleware/auth.middleware");
const adminValidate_middleware_1 = require("../middleware/adminValidate.middleware");
const upload_middleware_1 = require("../middleware/upload.middleware");
const product_controller_1 = require("../controllers/product.controller");
const productRouter = express_1.default.Router();
/**
 * @swagger
 * /api/v1/products/create:
 *   post:
 *     summary: Create a new product
 *     description: Upload product images and create a new product.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *                 example: "iPhone 15 Pro max"
 *               description:
 *                 type: string
 *                 description: Product description
 *                 example: "Latest Apple phone"
 *               price:
 *                 type: number
 *                 description: Product price
 *                 example: 80000
 *               category:
 *                 type: string
 *                 description: Product category
 *                 example: "Electronics"
 *               stock:
 *                 type: integer
 *                 description: Stock quantity
 *                 example: 16
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload up to 5 images (jpg, jpeg, png, jfif)
 *             required:
 *               - name
 *               - price
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Product created successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "68cbc192ec6b49bd016ba245"
 *                     name:
 *                       type: string
 *                       example: "iPhone 15 Pro max"
 *                     description:
 *                       type: string
 *                       example: "Latest Apple phone"
 *                     price:
 *                       type: number
 *                       example: 80000
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: url
 *                       example:
 *                         - "https://res.cloudinary.com/ddphodk2u/image/upload/v1758181291/ecommerce/Screenshot%202025-08-13%20234436.png"
 *                         - "https://res.cloudinary.com/ddphodk2u/image/upload/v1758177798/ecommerce/download.jpg"
 *                     category:
 *                       type: string
 *                       example: "Electronics"
 *                     stock:
 *                       type: integer
 *                       example: 16
 *                     isDeleted:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-09-18T08:23:41.585Z"
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Validation or file error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 message:
 *                   type: string
 *                   example: "Only JPG, JPEG, JFIF, and PNG image formats are allowed."
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
productRouter.post("/create", auth_middleware_1.authMiddleware, adminValidate_middleware_1.authorization, upload_middleware_1.upload.array("images", 5), (0, validate_1.validate)({ body: product_validate_1.productZodSchema }), product_controller_1.createProduct);
/**
 * @swagger
 * /api/v1/products/list:
 *   get:
 *     summary: Get product list
 *     description: Fetch a list of products with optional filters, pagination, and sorting.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product name or description (case-insensitive)
 *         example: "iphone"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *         example: "Electronics"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *         example: 1000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *         example: 50000
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *         example: 10
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *           default: "createdAt"
 *         description: Field name to sort by
 *         example: "price"
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (asc or desc)
 *         example: "desc"
 *     responses:
 *       200:
 *         description: Product list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Product list fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66f9c234bc1234567890abcd"
 *         name:
 *           type: string
 *           example: "Nike Shoes"
 *         description:
 *           type: string
 *           example: "High quality running shoes"
 *         price:
 *           type: number
 *           example: 1999
 *         category:
 *           type: string
 *           example: "Footwear"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             example: "https://res.cloudinary.com/demo/image/upload/abc.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
productRouter.get("/list", auth_middleware_1.authMiddleware, product_controller_1.listProducts);
/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get product by id
 *     description: Returns a single product by its MongoDB ObjectId.
 *     operationId: getProductById
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the product.
 *         schema:
 *           type: string
 *           pattern: "^[a-fA-F0-9]{24}$"
 *     responses:
 *       200:
 *         description: Product fetched successfully.
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
 *                   example: Product fetched
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized – missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Product not found or invalid id format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
productRouter.get("/:id", auth_middleware_1.authMiddleware, product_controller_1.getProductById);
/**
 * @swagger
 * /api/v1/products/update/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     summary: Update product
 *     description: Partially update a product by its MongoDB ObjectId. Accepts JSON fields and optional image uploads; new images replace existing ones.
 *     operationId: updateProduct
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the product to update.
 *         schema:
 *           type: string
 *           pattern: "^[a-fA-F0-9]{24}$"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               description:
 *                 type: string
 *                 example: Updated description text
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 999.99
 *               category:
 *                 type: string
 *                 example: Electronics
 *               stock:
 *                 type: integer
 *                 example: 30
 *               images:
 *                 type: array
 *                 description: Optional new images to replace existing ones (max 5).
 *                 items:
 *                   type: string
 *                   format: binary
 *           encoding:
 *             images:
 *               style: form
 *               explode: true
 *     responses:
 *       200:
 *         description: Product updated successfully.
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
 *                   example: Product updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66f6f4e2b1c3a0123456789a
 *                     name:
 *                       type: string
 *                       example: iPhone 15
 *                     description:
 *                       type: string
 *                       example: Latest model with A16 chip.
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 899.99
 *                     category:
 *                       type: string
 *                       example: Electronics
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: uri
 *                       example:
 *                         - https://res.cloudinary.com/demo/image/upload/v1/iphone.jpg
 *                     stock:
 *                       type: integer
 *                       example: 25
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-09-18T07:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-09-18T07:10:00.000Z
 *       400:
 *         description: Validation error or invalid image upload.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Validation error
 *                 data:
 *                   nullable: true
 *                   example: []
 *       401:
 *         description: Unauthorized – missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *                 data:
 *                   nullable: true
 *                   example: []
 *       404:
 *         description: Product not found or invalid id format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Product not found
 *                 data:
 *                   nullable: true
 *                   example: []
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 data:
 *                   nullable: true
 *                   example: []
 */
productRouter.patch("/update/:id", auth_middleware_1.authMiddleware, adminValidate_middleware_1.authorization, upload_middleware_1.upload.array("images", 5), (0, validate_1.validate)({ body: product_validate_1.updateProductZodSchema }), product_controller_1.updateProduct);
/**
 * @swagger
 * /api/v1/products/delete/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Soft-delete product
 *     description: Marks a product as deleted without removing it from the database.
 *     operationId: softDeleteProduct
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the product to soft-delete.
 *         schema:
 *           type: string
 *           pattern: "^[a-fA-F0-9]{24}$"
 *     responses:
 *       200:
 *         description: Product soft-deleted.
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
 *                   example: Product soft-deleted
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66f6f4e2b1c3a0123456789a
 *                     name:
 *                       type: string
 *                       example: Nokia 3310
 *                     description:
 *                       type: string
 *                       example: Solid feature phone
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 1999
 *                     category:
 *                       type: string
 *                       example: Electronics
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: uri
 *                       example:
 *                         - https://res.cloudinary.com/demo/image/upload/v1/phone.jpg
 *                     stock:
 *                       type: integer
 *                       example: 10
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized – missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *                 data:
 *                   nullable: true
 *                   example: []
 *       403:
 *         description: Forbidden – insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *                 data:
 *                   nullable: true
 *                   example: []
 *       404:
 *         description: Product not found or invalid id format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Product not found
 *                 data:
 *                   nullable: true
 *                   example: []
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *                 data:
 *                   nullable: true
 *                   example: []
 */
productRouter.delete("/delete/:id", auth_middleware_1.authMiddleware, adminValidate_middleware_1.authorization, product_controller_1.deleteProduct);
exports.default = productRouter;
