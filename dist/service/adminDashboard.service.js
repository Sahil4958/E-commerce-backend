"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusSummaryService = exports.salesReportService = exports.globalMetricsService = void 0;
const order_model_1 = require("../models/order.model");
const user_model_1 = require("../models/user.model");
const product_model_1 = require("../models/product.model");
const globalMetricsService = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const [revenueAgg, totalOrders, totalProducts, totalUsers] = yield Promise.all([
        order_model_1.Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]),
        order_model_1.Order.countDocuments(),
        product_model_1.Product.countDocuments({ isDeleted: { $ne: true } }),
        user_model_1.User.countDocuments(),
    ]);
    return {
        revenue: (_b = (_a = revenueAgg[0]) === null || _a === void 0 ? void 0 : _a.total) !== null && _b !== void 0 ? _b : 0,
        orders: totalOrders,
        products: totalProducts,
        users: totalUsers,
    };
});
exports.globalMetricsService = globalMetricsService;
const salesReportService = (from, to) => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.Order.aggregate([
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
});
exports.salesReportService = salesReportService;
const orderStatusSummaryService = () => __awaiter(void 0, void 0, void 0, function* () {
    return order_model_1.Order.aggregate([
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
});
exports.orderStatusSummaryService = orderStatusSummaryService;
