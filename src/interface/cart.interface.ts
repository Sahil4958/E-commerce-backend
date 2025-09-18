import { Types } from "mongoose";

export interface ICartItem {
  product: Types.ObjectId;
  qty: number;
  price: number;
}

export interface ICart {
  user: Types.ObjectId;
  items: ICartItem[];
  updatedAt: Date;
}
