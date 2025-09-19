"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String },
    description: String,
    price: { type: Number },
    images: [String],
    category: String,
    stock: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
productSchema.index({ name: "text", description: "text" });
exports.Product = (0, mongoose_1.model)("Product", productSchema);
