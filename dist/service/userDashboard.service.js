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
exports.updateUserProfileService = exports.getUserProfileService = exports.getUserOrdersService = void 0;
const order_model_1 = require("../models/order.model");
const user_model_1 = require("../models/user.model");
const mongoose_1 = require("mongoose");
const getUserOrdersService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(userId))
        return [];
    return order_model_1.Order.find({ user: userId }).populate("items.product");
});
exports.getUserOrdersService = getUserOrdersService;
const getUserProfileService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.User.findById(userId).select("-password");
});
exports.getUserProfileService = getUserProfileService;
const updateUserProfileService = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.User.findByIdAndUpdate(userId, data, { new: true }).select("-password");
});
exports.updateUserProfileService = updateUserProfileService;
