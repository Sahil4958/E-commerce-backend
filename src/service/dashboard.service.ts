import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";

export const kpiService = async (from?: Date, to?: Date) => {
  const match: any = {};
  if (from || to) {
    match.createdAt = {};
    if (from) match.createdAt.$gte = from;
    if (to) match.createdAt.$lte = to;
  }

  const [revenueAgg, ordersCount, productsCount, usersCount] =
    await Promise.all([
      Order.aggregate([
        { $match: match },
        {
          $group: {
            _id: null,
            revenue: { $sum: "$totalAmount" },
            orders: { $sum: 1 },
          },
        },
      ]),
      Order.countDocuments(match),
      Product.countDocuments({ isDeleted: { $ne: true } }),
      User.countDocuments({}),
    ]);

  const revenue = revenueAgg[0]?.revenue ?? 0;

  return {
    revenue,
    orders: ordersCount,
    products: productsCount,
    users: usersCount,
  };
};

export const revenueTimeseriesService = async (from: Date, to: Date) => {
  const agg = await Order.aggregate([
    { $match: { createdAt: { $gte: from, $lte: to } } },
    {
      $group: {
        _id: {
          y: { $year: "$createdAt" },
          m: { $month: "$createdAt" },
          d: { $dayOfMonth: "$createdAt" },
        },
        revenue: { $sum: "$totalAmount" },
        orders: { $sum: 1 },
      },
    },
    {
      $project: {
        date: {
          $dateFromParts: { year: "$_id.y", month: "$_id.m", day: "$_id.d" },
        },
        revenue: 1,
        orders: 1,
        _id: 0,
      },
    },
    { $sort: { date: 1 } },
  ]);
  return agg;
};

export const topProductsService = async (
  limit = 10,
  from?: Date,
  to?: Date
) => {
  const match: any = {};
  if (from || to) {
    match.createdAt = {};
    if (from) match.createdAt.$gte = from;
    if (to) match.createdAt.$lte = to;
  }

  const agg = await Order.aggregate([
    { $match: match },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        qty: { $sum: "$items.qty" },
        sales: { $sum: { $multiply: ["$items.qty", "$items.price"] } },
      },
    },
    { $sort: { sales: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $project: {
        _id: 0,
        productId: "$product._id",
        name: "$product.name",
        sales: 1,
        qty: 1,
        category: "$product.category",
      },
    },
  ]);

  return agg;
};

export const lowStockService = async (threshold = 5) => {
  return Product.find({ isDeleted: { $ne: true }, stock: { $lte: threshold } })
    .select("name stock category images")
    .sort({ stock: 1 })
    .limit(100);
};

export const orderStatusBreakdownService = async (from?: Date, to?: Date) => {
  const match: any = {};
  if (from || to) {
    match.createdAt = {};
    if (from) match.createdAt.$gte = from;
    if (to) match.createdAt.$lte = to;
  }
  const agg = await Order.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        amount: { $sum: "$totalAmount" },
      },
    },
    { $project: { status: "$_id", count: 1, amount: 1, _id: 0 } },
  ]);
  return agg;
};

export const newUsersTimeseriesService = async (from: Date, to: Date) => {
  const agg = await User.aggregate([
    { $match: { createdAt: { $gte: from, $lte: to } } },
    {
      $group: {
        _id: {
          y: { $year: "$createdAt" },
          m: { $month: "$createdAt" },
          d: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        date: {
          $dateFromParts: { year: "$_id.y", month: "$_id.m", day: "$_id.d" },
        },
        count: 1,
        _id: 0,
      },
    },
    { $sort: { date: 1 } },
  ]);
  return agg;
};
