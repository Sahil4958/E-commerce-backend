"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFiles = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5,
    },
});
const validateFiles = (files) => {
    const validExtensions = [".jpg", ".jpeg", ".png", ".jfif"];
    const invalidFiles = files.filter((file) => {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        if (!validExtensions.includes(ext)) {
            return true;
        }
        if ([".jpg", ".jpeg", ".jfif"].includes(ext) &&
            file.mimetype === "image/jpeg") {
            return false;
        }
        if (ext === ".png" && file.mimetype === "image/png") {
            return false;
        }
        return true;
    });
    if (files.length > 5) {
        return "You can upload a maximum of 5 images.";
    }
    if (invalidFiles.length > 0) {
        return "Only JPG, JPEG, JFIF, and PNG image formats are allowed.";
    }
    return null;
};
exports.validateFiles = validateFiles;
