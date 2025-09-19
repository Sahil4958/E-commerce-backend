import { Order } from "../models/order.model";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";

export const globalMetricsService = async () => {
  const [revenueAgg, totalOrders, totalProducts, totalUsers] =
    await Promise.all([
      Order.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Order.countDocuments(),
      Product.countDocuments({ isDeleted: { $ne: true } }),
      User.countDocuments(),
    ]);

  return {
    revenue: revenueAgg[0]?.total ?? 0,
    orders: totalOrders,
    products: totalProducts,
    users: totalUsers,
  };
};

export const salesReportService = async (from: Date, to: Date) => {
  return Order.aggregate([
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
};

export const orderStatusSummaryService = async () => {
  return Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        amount: { $sum: "$totalAmount" },
      },
    },
    {
      $project: {
        status: "$_id",
        count: 1,
        amount: 1,
        _id: 0,
      },
    },
  ]);
};
