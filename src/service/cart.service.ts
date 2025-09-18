import { Types } from "mongoose";
import { Cart, ICartModel } from "../models/cart.model";
import { Product } from "../models/product.model";

export const getCartByUserService = async (
  userId: string
): Promise<ICartModel | null> => {
  if (!Types.ObjectId.isValid(userId)) return null;
  return Cart.findOne({ user: userId }).populate("items.product");
};

export const addToCartService = async (
  userId: string,
  productId: string,
  qty = 1
) => {
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId))
    throw new Error("Invalid ids");
  const prod = await Product.findOne({
    _id: productId,
    isDeleted: { $ne: true },
  });
  if (!prod) throw new Error("Product not found");
  const price = prod.price;

  const pushed = await Cart.findOneAndUpdate(
    { user: userId, "items.product": { $ne: productId } },
    {
      $push: { items: { product: productId, qty, price } },
      $currentDate: { updatedAt: true },
    },
    { new: true }
  );
  if (pushed) return pushed;

  return Cart.findOneAndUpdate(
    { user: userId, "items.product": productId },
    { $inc: { "items.$.qty": qty }, $currentDate: { updatedAt: true } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

export const updateCartItemQtyService = async (
  userId: string,
  productId: string,
  qty: number
) => {
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId))
    throw new Error("Invalid ids");
  if (qty <= 0) {
    return Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: { items: { product: productId } },
        $currentDate: { updatedAt: true },
      },
      { new: true }
    );
  }
  return Cart.findOneAndUpdate(
    { user: userId, "items.product": productId },
    { $set: { "items.$.qty": qty }, $currentDate: { updatedAt: true } },
    { new: true }
  );
};

export const removeFromCartService = async (
  userId: string,
  productId: string
) => {
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId))
    throw new Error("Invalid ids");
  return Cart.findOneAndUpdate(
    { user: userId },
    {
      $pull: { items: { product: productId } },
      $currentDate: { updatedAt: true },
    },
    { new: true }
  );
};

export const clearCartService = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) return null;
  return Cart.findOneAndUpdate(
    { user: userId },
    { $set: { items: [] }, $currentDate: { updatedAt: true } },
    { new: true }
  );
};
