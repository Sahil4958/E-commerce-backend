import { Types } from "mongoose";
import { Order, IOrderModel } from "../models/order.model";
import { Cart } from "../models/cart.model";
import { Product } from "../models/product.model";
import { UpdateOrderBody } from "../validate/order.validate";

const computeExpectedDelivery = (shippingMethod?: "standard" | "express") => {
  const d = new Date();
  d.setDate(d.getDate() + (shippingMethod === "express" ? 2 : 5));
  return d;
};

export const checkoutFromCartService = async (
  userId: string,
  extra: {
    address?: any;
    shippingMethod?: "standard" | "express";
    notes?: string;
  }
): Promise<IOrderModel> => {
  if (!Types.ObjectId.isValid(userId)) throw new Error("Invalid user id");

  const cart = await Cart.findOne({ user: userId });
  if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

  const items: Array<{ product: Types.ObjectId; qty: number; price: number }> =
    [];
  let total = 0;

  for (const it of cart.items) {
    const prod = await Product.findOne({
      _id: it.product,
      isDeleted: { $ne: true },
    });
    if (!prod) throw new Error("Product not found or deleted");

    if (prod.stock < it.qty)
      throw new Error(`Insufficient stock for ${prod.name}`);

    prod.stock -= it.qty;
    await prod.save();

    items.push({ product: prod._id, qty: it.qty, price: prod.price });
    total += prod.price * it.qty;
  }

  const expectedDelivery = computeExpectedDelivery(extra?.shippingMethod);

  const order = await Order.create({
    user: userId,
    items,
    totalAmount: total,
    status: "placed",
    expectedDelivery,
    extra,
  });

  await Cart.updateOne({ user: userId }, { $set: { items: [] } });
  return order;
};

export const getOrderByIdService = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Order.findById(id).populate("items.product");
};

export const getOrdersByUserService = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) return [];
  return Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("items.product");
};

export const updateOrderService = async (
  id: string,
  update: UpdateOrderBody
) => {
  if (!Types.ObjectId.isValid(id)) return null;
  return Order.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
};
export const updateOrderStatusService = async (
  orderId: string,
  status: "placed" | "shipped" | "delivered" | "cancelled"
): Promise<IOrderModel | null> => {
  if (!Types.ObjectId.isValid(orderId)) return null;

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true, runValidators: true }
  );

  return order;
};
export const cancelOrderService = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) return null;
  const order = await Order.findById(id);
  if (!order) return null;
  const now = new Date();
  if (order.expectedDelivery && now >= new Date(order.expectedDelivery))
    throw new Error("Cannot cancel on/after expected delivery date");
  if (order.status === "placed") {
    for (const item of order.items) {
      const prod = await Product.findById(item.product._id);
      if (prod) {
        prod.stock += item.qty;
        await prod.save();
      }
    }
  }

  order.status = "cancelled";
  await order.save();
  return order;
};

export const listOrderedProductsService = async (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) return [];
  const orders = await Order.find({ user: userId })
    .select("items")
    .populate("items.product");
  return orders.flatMap((o) => o.items);
};

export const totalExpensesService = async (
  userId: string,
  from?: Date,
  to?: Date
) => {
  if (!Types.ObjectId.isValid(userId)) return 0;

  const match: any = { user: new Types.ObjectId(userId) };
  if (from || to) {
    match.createdAt = {};
    if (from) match.createdAt.$gte = from;
    if (to) match.createdAt.$lte = to;
  }

  const agg = await Order.aggregate([
    { $match: match },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);
  return agg[0]?.total ?? 0;
};

