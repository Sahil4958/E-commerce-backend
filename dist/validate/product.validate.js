"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductZodSchema = exports.productZodSchema = void 0;
const zod_1 = require("zod");
exports.productZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().optional(),
    price: zod_1.z.coerce.number().nonnegative("Price must be a positive number"),
    images: zod_1.z.array(zod_1.z.string().url("Each image must be a valid URL")).optional(),
    category: zod_1.z.string().optional(),
    stock: zod_1.z.coerce.number().int().nonnegative().default(0),
    isDeleted: zod_1.z.boolean().default(false),
    createdAt: zod_1.z.date().default(() => new Date()),
});
exports.updateProductZodSchema = exports.productZodSchema.partial();
