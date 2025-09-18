import { Schema, model, Document } from "mongoose";
import { IOrder, IOrderItem } from "../interface/order.interface";

export interface IOrderItemModel extends IOrderItem, Document {}
export interface IOrderModel extends IOrder, Document {}

const orderItemSchema = new Schema<IOrderItemModel>({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  qty: { type: Number },
  price: { type: Number },
});

const orderSchema = new Schema<IOrderModel>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  items: [orderItemSchema],
  totalAmount: { type: Number },
  status: {
    type: String,
    enum: ["placed", "shipped", "delivered", "cancelled"],
    default: "placed",
  },
  expectedDelivery: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Order = model<IOrderModel>("Order", orderSchema);
