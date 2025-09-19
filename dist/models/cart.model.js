"use strict";
// import { Schema, model, Document } from "mongoose";
// import { ICart, ICartItem } from "../interface/cart.interface";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
// export interface ICartItemModel extends ICartItem, Document {}
// export interface ICartModel extends ICart, Document {}
// const cartItemSchema = new Schema<ICartItemModel>({
//   product: { type: Schema.Types.ObjectId, ref: "Product" },
//   qty: { type: Number, default: 1 },
//   price: { type: Number },
// });
// const cartSchema = new Schema<ICartModel>(
//   {
//     user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
//     items: [cartItemSchema],
//     updatedAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );
// export const Cart = model<ICartModel>("Cart", cartSchema);
// models/cart.model.ts
const mongoose_1 = require("mongoose");
const cartItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    qty: { type: Number, default: 1, min: 1 },
    price: { type: Number, required: true, min: 0 },
});
const cartSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true,
    },
    items: { type: [cartItemSchema], default: [] },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Cart = (0, mongoose_1.model)("Cart", cartSchema);
