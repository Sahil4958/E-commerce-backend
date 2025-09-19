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
exports.deleteProductService = exports.updateProductService = exports.getProductByIdService = exports.listProductsService = exports.createProductService = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = require("../models/product.model");
const createProductService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.create(Object.assign({}, data));
    return product;
});
exports.createProductService = createProductService;
const pagination_1 = require("../utils/pagination");
const listProductsService = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (pagination = {}) {
    const { skip, resultPerPage, sort, page } = (0, pagination_1.paginationObject)(pagination);
    const baseFilter = { isDeleted: { $ne: true } };
    const [products, totalProducts] = yield Promise.all([
        product_model_1.Product.find(baseFilter)
            .sort(sort)
            .skip(skip)
            .limit(resultPerPage)
            .select({ isDeleted: 0 }),
        product_model_1.Product.countDocuments(baseFilter),
    ]);
    return {
        products,
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / resultPerPage),
        itemsPerPage: resultPerPage,
    };
});
exports.listProductsService = listProductsService;
const getProductByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    return product_model_1.Product.findOne({ _id: id, isDeleted: { $ne: true } }, { isDeleted: 0 });
});
exports.getProductByIdService = getProductByIdService;
const updateProductService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    const updatePayload = {};
    for (const [k, v] of Object.entries(data)) {
        if (v !== undefined)
            updatePayload[k] = v;
    }
    const product = yield product_model_1.Product.findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
    });
    return product;
});
exports.updateProductService = updateProductService;
const deleteProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return null;
    const product = yield product_model_1.Product.findByIdAndUpdate(id, { $set: { isDeleted: true } }, {
        new: true,
        runValidators: true,
        projection: { isDeleted: 0 },
    });
    return product;
});
exports.deleteProductService = deleteProductService;
