"use strict";
// import { Schema, model, Document } from "mongoose";
// import { IOrder, IOrderItem } from "../interface/order.interface";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
// export interface IOrderItemModel extends IOrderItem, Document {}
// export interface IOrderModel extends IOrder, Document {}
// const orderItemSchema = new Schema<IOrderItemModel>({
//   product: { type: Schema.Types.ObjectId, ref: "Product"},
//   qty: { type: Number },
//   price: { type: Number },
// });
// const orderSchema = new Schema<IOrderModel>({
//   user: { type: Schema.Types.ObjectId, ref: "User" },
//   items: [orderItemSchema],
//   totalAmount: { type: Number },
//   status: {
//     type: String,
//     enum: ["placed", "shipped", "delivered", "cancelled"],
//     default: "placed",
//   },
//   expectedDelivery: { type: Date },
//   createdAt: { type: Date, default: Date.now },
// });
// export const Order = model<IOrderModel>("Order", orderSchema);
const mongoose_1 = require("mongoose");
const orderItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product" },
    qty: { type: Number },
    price: { type: Number },
});
const orderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    items: [orderItemSchema],
    totalAmount: { type: Number },
    status: {
        type: String,
        enum: ["placed", "shipped", "delivered", "cancelled"],
        default: "placed",
    },
    expectedDelivery: { type: Date },
    createdAt: { type: Date, default: Date.now },
    extra: {
        address: {
            line1: String,
            line2: String,
            city: String,
            state: String,
            zip: String,
            country: String,
        },
        shippingMethod: { type: String, enum: ["standard", "express"] },
        notes: String,
    },
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
