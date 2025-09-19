"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const apiResponse_1 = require("../utils/apiResponse");
const http_status_codes_1 = require("http-status-codes");
const message_1 = require("../utils/message");
const config_1 = require("../config");
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, message_1.messages.TOKENLESS_ERROR);
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        req.userInfo = decoded;
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Access denied, token verification failed. Please log in to continue.",
        });
    }
};
exports.authMiddleware = authMiddleware;
