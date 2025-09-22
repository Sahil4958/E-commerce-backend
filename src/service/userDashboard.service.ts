import { Order } from "../models/order.model";
import { User } from "../models/user.model";
import { Types } from "mongoose";

export const getUserOrdersService = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) return [];
  return Order.find({ user: userId }).populate("items.product");
};

export const getUserProfileService = async (userId: string) => {
  return User.findById(userId).select("-password");
};

export const updateUserProfileService = async (userId: string, data: any) => {
  return User.findByIdAndUpdate(userId, data, { new: true }).select(
    "-password"
  );
};
