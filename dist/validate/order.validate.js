"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expensesQuery = exports.updateOrderStatusBody = exports.updateOrderBody = exports.checkoutBody = exports.createOrderBody = void 0;
const zod_1 = require("zod");
exports.createOrderBody = zod_1.z.object({
    user: zod_1.z.string().min(1, "User ID is required"),
    items: zod_1.z
        .array(zod_1.z.object({
        product: zod_1.z.string().min(1, "Product ID is required"),
        qty: zod_1.z.coerce.number().int().min(1),
        price: zod_1.z.coerce.number().min(0),
    }))
        .min(1, "Order must have at least one item"),
    totalAmount: zod_1.z.coerce.number().min(0),
    status: zod_1.z
        .enum(["placed", "shipped", "delivered", "cancelled"])
        .default("placed"),
    expectedDelivery: zod_1.z.coerce.date().optional(),
    extra: zod_1.z
        .object({
        address: zod_1.z
            .object({
            line1: zod_1.z.string().min(1),
            line2: zod_1.z.string().optional(),
            city: zod_1.z.string().min(1),
            state: zod_1.z.string().min(1),
            zip: zod_1.z.string().min(1),
            country: zod_1.z.string().min(1),
        })
            .optional(),
        shippingMethod: zod_1.z.enum(["standard", "express"]).optional(),
        notes: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.checkoutBody = zod_1.z.object({
    address: zod_1.z.object({
        line1: zod_1.z.string().min(1),
        line2: zod_1.z.string().optional(),
        city: zod_1.z.string().min(1),
        state: zod_1.z.string().min(1),
        zip: zod_1.z.string().min(1),
        country: zod_1.z.string().min(1),
    }),
    shippingMethod: zod_1.z.enum(["standard", "express"]).default("standard"),
    notes: zod_1.z.string().optional(),
});
exports.updateOrderBody = zod_1.z.object({
    status: zod_1.z.enum(["placed", "shipped", "delivered", "cancelled"]).optional(),
    expectedDelivery: zod_1.z.coerce.date().optional(),
    extra: zod_1.z
        .object({
        address: zod_1.z
            .object({
            line1: zod_1.z.string().min(1),
            line2: zod_1.z.string().optional(),
            city: zod_1.z.string().min(1),
            state: zod_1.z.string().min(1),
            zip: zod_1.z.string().min(1),
            country: zod_1.z.string().min(1),
        })
            .optional(),
        shippingMethod: zod_1.z.enum(["standard", "express"]).optional(),
        notes: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.updateOrderStatusBody = zod_1.z.object({
    status: zod_1.z.enum(["placed", "shipped", "delivered", "cancelled"]),
});
exports.expensesQuery = zod_1.z.object({
    from: zod_1.z.string().optional(),
    to: zod_1.z.string().optional(),
});
