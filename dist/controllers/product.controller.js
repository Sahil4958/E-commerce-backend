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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.listProducts = exports.createProduct = void 0;
const http_status_codes_1 = require("http-status-codes");
const product_service_1 = require("../service/product.service");
const errHandler_1 = require("../utils/errHandler");
const message_1 = require("../utils/message");
const apiResponse_1 = require("../utils/apiResponse");
const cloudinary_1 = require("../utils/cloudinary");
const upload_middleware_1 = require("../middleware/upload.middleware");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const fileError = (0, upload_middleware_1.validateFiles)(files);
        if (fileError) {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, fileError);
        }
        const uploadedImages = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield cloudinary_1.Cloudinary.uploadToCloudinary(file, "emp");
            return result.secure_url;
        })));
        const product = yield (0, product_service_1.createProductService)(Object.assign(Object.assign({}, req.body), { images: uploadedImages }));
        (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.CREATED, message_1.messages.PRODUCT_CREATED, product);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.createProduct = createProduct;
const listProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page);
        const itemsPerPage = Number(req.query.itemsPerPage);
        const sortField = typeof req.query.sortField === "string" ? req.query.sortField : undefined;
        const sortOrder = req.query.sortOrder === "asc"
            ? "asc"
            : req.query.sortOrder === "desc"
                ? "desc"
                : undefined;
        const result = yield (0, product_service_1.listProductsService)({
            page: Number.isFinite(page) && page > 0 ? page : 1,
            itemsPerPage: Number.isFinite(itemsPerPage) && itemsPerPage > 0 ? itemsPerPage : 10,
            sortField,
            sortOrder,
        });
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, "Product list fetched", result);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.listProducts = listProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield (0, product_service_1.getProductByIdService)(id);
        if (!product) {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found", []);
        }
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, "Product fetched", product);
    }
    catch (error) {
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong", {
            error: error.message,
        });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const files = req.files || [];
        let uploadedImages;
        if (files.length > 0) {
            const fileError = (0, upload_middleware_1.validateFiles)(files);
            if (fileError) {
                return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, fileError);
            }
            uploadedImages = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield cloudinary_1.Cloudinary.uploadToCloudinary(file, "emp");
                return result.secure_url;
            })));
        }
        const payload = Object.assign(Object.assign({}, body), (uploadedImages ? { images: uploadedImages } : {}));
        const updated = yield (0, product_service_1.updateProductService)(id, payload);
        if (!updated) {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
        }
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, "Product updated", updated);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield (0, product_service_1.deleteProductService)(id);
        if (!product) {
            return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.NOT_FOUND, message_1.messages.PRODUCT_NOT_FOUND);
        }
        return (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.messages.PRODUCT_DELETED);
    }
    catch (error) {
        (0, errHandler_1.handleError)(res, error);
    }
});
exports.deleteProduct = deleteProduct;
