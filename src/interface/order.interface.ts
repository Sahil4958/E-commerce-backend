import { Types } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId;
  qty: number;
  price: number;
}

export interface IOrder {
  user: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: "placed" | "shipped" | "delivered" | "cancelled";
  expectedDelivery?: Date;
  createdAt?: Date;
  extra?: {
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
    };
    shippingMethod?: "standard" | "express";
    notes?: string;
  };
}
