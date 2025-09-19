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
exports.cancelOrder = exports.totalExpenses = exports.listOrderedProducts = exports.updateOrderStatus = exports.updateOrder = exports.getMyOrders = exports.getOrder = exports.checkoutFromCart = void 0;
const http_status_codes_1 = require("http-status-codes");
const order_service_1 = require("../service/order.service");
const apiResponse_1 = require("../utils/apiResponse");
const errHandler_1 = require("../utils/errHandler");
const order_model_1 = require("../models/order.model");
const message_1 = require("../utils/message");
const checkoutFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        const order = yield (0, order_service_1.checkoutFromCartService)(userId, req.body);
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.CREATED, message_1.messages.ORDER_PLACED, order);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.checkoutFromCart = checkoutFromCart;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield (0, order_service_1.getOrderByIdService)(req.params.id);
        if (!order) {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.NOT_FOUND, message_1.messages.ORDER_NOT_FOUND);
        }
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.ORDER_FETCHED, order);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.getOrder = getOrder;
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        const orders = yield (0, order_service_1.getOrdersByUserService)(userId);
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.ORDER_FETCHED, orders);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.getMyOrders = getMyOrders;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.userInfo;
        const order = yield order_model_1.Order.findById(req.params.id);
        if (!order) {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.NOT_FOUND, message_1.messages.ORDER_NOT_FOUND);
        }
        if (req.body.status && user.role !== "ADMIN") {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.FORBIDDEN, "Only admin can update order status");
        }
        if (user.role !== "ADMIN" &&
            ["shipped", "delivered"].includes(order.status)) {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.FORBIDDEN, "You cannot update this order now");
        }
        const updatedOrder = yield (0, order_service_1.updateOrderService)(req.params.id, req.body);
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.ORDER_UPDATED, updatedOrder);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.updateOrder = updateOrder;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const order = yield (0, order_service_1.updateOrderStatusService)(req.params.id, status);
        if (!order) {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.NOT_FOUND, message_1.messages.ORDER_NOT_FOUND);
        }
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.ORDER_STATUS_UPDATED, order);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.updateOrderStatus = updateOrderStatus;
const listOrderedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        const items = yield (0, order_service_1.listOrderedProductsService)(userId);
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.ORDERED_PRODUCTS, items);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.listOrderedProducts = listOrderedProducts;
const totalExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        const from = req.query.from ? new Date(String(req.query.from)) : undefined;
        const to = req.query.to ? new Date(String(req.query.to)) : undefined;
        const total = yield (0, order_service_1.totalExpensesService)(userId, from, to);
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.ORDER_EXPENSE, {
            total,
            from,
            to,
        });
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.totalExpenses = totalExpenses;
const cancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield (0, order_service_1.cancelOrderService)(req.params.id);
        if (!order) {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, message_1.messages.ORDER_NOT_FOUND);
        }
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.ORDER_CANCELLED, order);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.cancelOrder = cancelOrder;
