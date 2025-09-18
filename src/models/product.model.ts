import { Document, model, Schema } from "mongoose";
import { IProduct } from "../interface/product.interface";

export interface IProductModel extends IProduct, Document {}

const productSchema = new Schema<IProduct>({
  name: { type: String },
  description: String,
  price: { type: Number },
  images: [String],
  category: String,
  stock: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

productSchema.index({ name: "text", description: "text" });

export const Product = model<IProduct>("Product", productSchema);
