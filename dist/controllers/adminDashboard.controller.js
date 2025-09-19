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
exports.getOrderStatuses = exports.getSalesReport = exports.getGlobalMetrics = exports.listAllProducts = exports.listAllUsers = void 0;
const user_model_1 = require("../models/user.model");
const product_model_1 = require("../models/product.model");
const apiResponse_1 = require("../utils/apiResponse");
const http_status_codes_1 = require("http-status-codes");
const errHandler_1 = require("../utils/errHandler");
const adminDashboard_service_1 = require("../service/adminDashboard.service");
const message_1 = require("../utils/message");
const listAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find().select("-password");
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, "Users fetched", users);
    }
    catch (err) {
        (0, errHandler_1.handleError)(res, err);
    }
});
exports.listAllUsers = listAllUsers;
const listAllProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.Product.find({ isDeleted: { $ne: true } });
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.PRODUCT_LIST_FETCHED, products);
    }
    catch (err) {
        (0, errHandler_1.handleError)(res, err);
    }
});
exports.listAllProducts = listAllProducts;
const getGlobalMetrics = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, adminDashboard_service_1.globalMetricsService)();
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.GLOBAL_METRICS, data);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.getGlobalMetrics = getGlobalMetrics;
const getSalesReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const from = new Date(String(req.query.from));
        const to = new Date(String(req.query.to));
        const data = yield (0, adminDashboard_service_1.salesReportService)(from, to);
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.SALES_REPORT, data);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.getSalesReport = getSalesReport;
const getOrderStatuses = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, adminDashboard_service_1.orderStatusSummaryService)();
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.ORDER_STATUSES, data);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.getOrderStatuses = getOrderStatuses;
