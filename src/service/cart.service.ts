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
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid ids");
  }

  const prod = await Product.findOne({
    _id: productId,
    isDeleted: { $ne: true },
  });
  if (!prod) throw new Error("Product not found");

  if (prod.stock <= 0) {
    throw new Error("Product is out of stock");
  }

  if (qty > prod.stock) {
    throw new Error(`Only ${prod.stock} items are available in stock`);
  }

  const price = prod.price;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ product: productId, qty, price }],
    });
    return cart;
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    const totalQty = existingItem.qty + qty;

    if (totalQty > prod.stock) {
      throw new Error(
        `You already have ${existingItem.qty} in cart. Only ${
          prod.stock - existingItem.qty
        } more can be added.`
      );
    }

    existingItem.qty = totalQty;
  } else {
    cart.items.push({ product: new Types.ObjectId(productId), qty, price });
  }

  cart.updatedAt = new Date();
  await cart.save();

  return cart;
};

export const updateCartItemQtyService = async (
  userId: string,
  productId: string,
  qty: number
) => {
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId))
    throw new Error("Invalid ids");

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (qty > product.stock) {
    throw new Error(`Only ${product.stock} items are available in stock`);
  }
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

  const cart = await Cart.findOne({ user: userId, "items.product": productId });
  if (!cart) throw new Error("Item not found in cart");

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
