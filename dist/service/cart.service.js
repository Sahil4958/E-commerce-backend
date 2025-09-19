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
exports.clearCartService = exports.removeFromCartService = exports.updateCartItemQtyService = exports.addToCartService = exports.getCartByUserService = void 0;
const mongoose_1 = require("mongoose");
const cart_model_1 = require("../models/cart.model");
const product_model_1 = require("../models/product.model");
const getCartByUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(userId))
        return null;
    return cart_model_1.Cart.findOne({ user: userId }).populate("items.product");
});
exports.getCartByUserService = getCartByUserService;
const addToCartService = (userId_1, productId_1, ...args_1) => __awaiter(void 0, [userId_1, productId_1, ...args_1], void 0, function* (userId, productId, qty = 1) {
    if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid ids");
    }
    const prod = yield product_model_1.Product.findOne({
        _id: productId,
        isDeleted: { $ne: true },
    });
    if (!prod)
        throw new Error("Product not found");
    if (prod.stock <= 0) {
        throw new Error("Product is out of stock");
    }
    if (qty > prod.stock) {
        throw new Error(`Only ${prod.stock} items are available in stock`);
    }
    const price = prod.price;
    let cart = yield cart_model_1.Cart.findOne({ user: userId });
    if (!cart) {
        cart = yield cart_model_1.Cart.create({
            user: userId,
            items: [{ product: productId, qty, price }],
        });
        return cart;
    }
    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
        const totalQty = existingItem.qty + qty;
        if (totalQty > prod.stock) {
            throw new Error(`You already have ${existingItem.qty} in cart. Only ${prod.stock - existingItem.qty} more can be added.`);
        }
        existingItem.qty = totalQty;
    }
    else {
        cart.items.push({ product: new mongoose_1.Types.ObjectId(productId), qty, price });
    }
    cart.updatedAt = new Date();
    yield cart.save();
    return cart;
});
exports.addToCartService = addToCartService;
const updateCartItemQtyService = (userId, productId, qty) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(productId))
        throw new Error("Invalid ids");
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    if (qty > product.stock) {
        throw new Error(`Only ${product.stock} items are available in stock`);
    }
    if (qty <= 0) {
        return cart_model_1.Cart.findOneAndUpdate({ user: userId }, {
            $pull: { items: { product: productId } },
            $currentDate: { updatedAt: true },
        }, { new: true });
    }
    return cart_model_1.Cart.findOneAndUpdate({ user: userId, "items.product": productId }, { $set: { "items.$.qty": qty }, $currentDate: { updatedAt: true } }, { new: true });
});
exports.updateCartItemQtyService = updateCartItemQtyService;
const removeFromCartService = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(productId))
        throw new Error("Invalid ids");
    const cart = yield cart_model_1.Cart.findOne({ user: userId, "items.product": productId });
    if (!cart)
        throw new Error("Item not found in cart");
    return cart_model_1.Cart.findOneAndUpdate({ user: userId }, {
        $pull: { items: { product: productId } },
        $currentDate: { updatedAt: true },
    }, { new: true });
});
exports.removeFromCartService = removeFromCartService;
const clearCartService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(userId))
        return null;
    return cart_model_1.Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] }, $currentDate: { updatedAt: true } }, { new: true });
});
exports.clearCartService = clearCartService;
