"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItemBody = exports.updateQtyBody = exports.addToCartBody = void 0;
const zod_1 = require("zod");
exports.addToCartBody = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
    qty: zod_1.z.coerce.number().int().min(1).default(1),
});
exports.updateQtyBody = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
    qty: zod_1.z.coerce.number().int(), // allow 0 to remove
});
exports.removeItemBody = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
});
