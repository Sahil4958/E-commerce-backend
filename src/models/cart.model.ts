// import { Schema, model, Document } from "mongoose";
// import { ICart, ICartItem } from "../interface/cart.interface";

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
import { Schema, model, Document } from "mongoose";
import { ICart, ICartItem } from "../interface/cart.interface";

export interface ICartItemModel extends ICartItem, Document {}
export interface ICartModel extends ICart, Document {}

const cartItemSchema = new Schema<ICartItemModel>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, default: 1, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const cartSchema = new Schema<ICartModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    items: { type: [cartItemSchema], default: [] },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Cart = model<ICartModel>("Cart", cartSchema);
