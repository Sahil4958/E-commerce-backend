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
exports.authorization = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../models/user.model");
const apiResponse_1 = require("../utils/apiResponse");
const message_1 = require("../utils/message");
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userInfo.id;
    const roleDoc = yield user_model_1.User.findOne({ _id: userId }).populate("role");
    const userRole = roleDoc === null || roleDoc === void 0 ? void 0 : roleDoc.role.role;
    if (userRole === "ADMIN") {
        next();
    }
    else {
        (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.UNAUTHORIZED, message_1.messages.UNAUTHORIZED);
    }
});
exports.authorization = authorization;
