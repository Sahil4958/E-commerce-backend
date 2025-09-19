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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = exports.seedRole = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const role_model_1 = require("../models/role.model");
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const filePathOfRole = path_1.default.join(__dirname, "..", "seeds", "role.json");
const filePathOfAdmin = path_1.default.join(__dirname, "..", "seeds", "admin.json");
const createRole = JSON.parse(fs_1.default.readFileSync(filePathOfRole, "utf-8"));
const adminInfo = JSON.parse(fs_1.default.readFileSync(filePathOfAdmin, "utf-8"));
const seedRole = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleData = yield role_model_1.Role.find();
        if (roleData.length === 0) {
            yield role_model_1.Role.create(createRole);
        }
        else {
            console.log("Role exist");
        }
    }
    catch (error) {
        return error instanceof Error ? error.message : "An unknown error occurred";
    }
});
exports.seedRole = seedRole;
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminRole = yield role_model_1.Role.findOne({
            role: "ADMIN",
            isDeleted: false,
        });
        const existingAdmin = yield user_model_1.User.findOne({ email: adminInfo.email });
        if (existingAdmin) {
            console.log("admin already exist");
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(adminInfo.password, salt);
        yield user_model_1.User.create(Object.assign(Object.assign({}, adminInfo), { password: hashedPassword, role: adminRole === null || adminRole === void 0 ? void 0 : adminRole._id }));
    }
    catch (error) {
        return error instanceof Error ? error.message : "An unknown error occurred";
    }
});
exports.createAdmin = createAdmin;
