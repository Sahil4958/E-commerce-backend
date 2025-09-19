"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidateSchema = exports.registerValidateSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.registerValidateSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email format" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    role: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid role ObjectId",
    }),
    isDeleted: zod_1.z.boolean().optional().default(false),
});
exports.loginValidateSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email format" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});
