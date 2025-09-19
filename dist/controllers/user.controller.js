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
exports.loginUserController = exports.registerUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = require("../service/user.service");
const apiResponse_1 = require("../utils/apiResponse");
const message_1 = require("../utils/message");
const errHandler_1 = require("../utils/errHandler");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.createUserService)(req.body);
        (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.CREATED, message_1.messages.USER_REGISTERED, {
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.registerUser = registerUser;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield (0, user_service_1.loginUserService)(email, password);
        (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.USER_LOGIN_SUCCESS, result);
    }
    catch (error) {
        return (0, errHandler_1.handleError)(res, error);
    }
});
exports.loginUserController = loginUserController;
