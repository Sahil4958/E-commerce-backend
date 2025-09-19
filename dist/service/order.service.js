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
exports.totalExpensesService = exports.listOrderedProductsService = exports.cancelOrderService = exports.updateOrderStatusService = exports.updateOrderService = exports.getOrdersByUserService = exports.getOrderByIdService = exports.checkoutFromCartService = void 0;
const mongoose_1 = require("mongoose");
const order_model_1 = require("../models/order.model");
const cart_model_1 = require("../models/cart.model");
const product_model_1 = require("../models/product.model");
const computeExpectedDelivery = (shippingMethod) => {
    const d = new Date();
    d.setDate(d.getDate() + (shippingMethod === "express" ? 2 : 5));
    return d;
};
const checkoutFromCartService = (userId, extra) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(userId))
        throw new Error("Invalid user id");
    const cart = yield cart_model_1.Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0)
        throw new Error("Cart is empty");
    const items = [];
    let total = 0;
    for (const it of cart.items) {
        const prod = yield product_model_1.Product.findOne({
            _id: it.product,
            isDeleted: { $ne: true },
        });
        if (!prod)
            throw new Error("Product not found or deleted");
        if (prod.stock < it.qty)
            throw new Error(`Insufficient stock for ${prod.name}`);
        prod.stock -= it.qty;
        yield prod.save();
        items.push({ product: prod._id, qty: it.qty, price: prod.price });
        total += prod.price * it.qty;
    }
    const expectedDelivery = computeExpectedDelivery(extra === null || extra === void 0 ? void 0 : extra.shippingMethod);
    const order = yield order_model_1.Order.create({
        user: userId,
        items,
        totalAmount: total,
        status: "placed",
        expectedDelivery,
        extra,
    });
    yield cart_model_1.Cart.updateOne({ user: userId }, { $set: { items: [] } });
    return order;
});
exports.checkoutFromCartService = checkoutFromCartService;
const getOrderByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    return order_model_1.Order.findById(id).populate("items.product");
});
exports.getOrderByIdService = getOrderByIdService;
const getOrdersByUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(userId))
        return [];
    return order_model_1.Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate("items.product");
});
exports.getOrdersByUserService = getOrdersByUserService;
const updateOrderService = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    return order_model_1.Order.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
    });
});
exports.updateOrderService = updateOrderService;
const updateOrderStatusService = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(orderId))
        return null;
    const order = yield order_model_1.Order.findByIdAndUpdate(orderId, { status }, { new: true, runValidators: true });
    return order;
});
exports.updateOrderStatusService = updateOrderStatusService;
const cancelOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    const order = yield order_model_1.Order.findById(id);
    if (!order)
        return null;
    const now = new Date();
    if (order.expectedDelivery && now >= new Date(order.expectedDelivery))
        throw new Error("Cannot cancel on/after expected delivery date");
    if (order.status === "placed") {
        for (const item of order.items) {
            const prod = yield product_model_1.Product.findById(item.product._id);
            if (prod) {
                prod.stock += item.qty;
                yield prod.save();
            }
        }
    }
    order.status = "cancelled";
    yield order.save();
    return order;
});
exports.cancelOrderService = cancelOrderService;
const listOrderedProductsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(userId))
        return [];
    const orders = yield order_model_1.Order.find({ user: userId })
        .select("items")
        .populate("items.product");
    return orders.flatMap((o) => o.items);
});
exports.listOrderedProductsService = listOrderedProductsService;
const totalExpensesService = (userId, from, to) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!mongoose_1.Types.ObjectId.isValid(userId))
        return 0;
    const match = { user: new mongoose_1.Types.ObjectId(userId) };
    if (from || to) {
        match.createdAt = {};
        if (from)
            match.createdAt.$gte = from;
        if (to)
            match.createdAt.$lte = to;
    }
    const agg = yield order_model_1.Order.aggregate([
        { $match: match },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    return (_b = (_a = agg[0]) === null || _a === void 0 ? void 0 : _a.total) !== null && _b !== void 0 ? _b : 0;
});
exports.totalExpensesService = totalExpensesService;
