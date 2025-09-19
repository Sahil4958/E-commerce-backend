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
exports.clearCart = exports.removeFromCart = exports.updateCartItemQty = exports.addToCart = exports.getMyCart = void 0;
const http_status_codes_1 = require("http-status-codes");
const cart_service_1 = require("../service/cart.service");
const apiResponse_1 = require("../utils/apiResponse");
const errHandler_1 = require("../utils/errHandler");
const message_1 = require("../utils/message");
const getMyCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.UNAUTHORIZED, message_1.messages.INVALID_USER);
        }
        const cart = yield (0, cart_service_1.getCartByUserService)(userId);
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.CART_FETCHED, cart !== null && cart !== void 0 ? cart : { items: [] });
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.getMyCart = getMyCart;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.UNAUTHORIZED, "User not authenticated");
        }
        const { productId, qty } = req.body;
        const cart = yield (0, cart_service_1.addToCartService)(userId, productId, Number(qty !== null && qty !== void 0 ? qty : 1));
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.ITEM_ADDED_TO_CART, cart);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.addToCart = addToCart;
const updateCartItemQty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        const { productId, qty } = req.body;
        const cart = yield (0, cart_service_1.updateCartItemQtyService)(userId, productId, Number(qty));
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, "Cart updated", cart);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.updateCartItemQty = updateCartItemQty;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        const { productId } = req.body;
        const cart = yield (0, cart_service_1.removeFromCartService)(userId, productId);
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.CART_ITEM_REMOVED, cart);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.removeFromCart = removeFromCart;
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        const cart = yield (0, cart_service_1.clearCartService)(userId);
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.CART_CLEARED, cart);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.clearCart = clearCart;
