import {
  productZodSchema,
  updateProductZodSchema,
} from "./../validate/product.validate";
import express from "express";
import { validate } from "../middleware/validate";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorization } from "../middleware/adminValidate.middleware";
import { upload } from "../middleware/upload.middleware";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/product.controller";

const productRouter = express.Router();

productRouter.post(
  "/create",

  authMiddleware,
  authorization,
  upload.array("images", 5),
  validate({ body: productZodSchema }),
  createProduct
);

productRouter.get("/list", authMiddleware, listProducts);

productRouter.get("/:id", authMiddleware, getProductById);

productRouter.patch(
  "/update/:id",
  authMiddleware,
  authorization,
  upload.array("images", 5),
  validate({ body: updateProductZodSchema }),
  updateProduct
);

productRouter.delete(
  "/delete/:id",
  authMiddleware,
  authorization,
  deleteProduct
);

export default productRouter;
