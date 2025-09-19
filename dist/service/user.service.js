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
exports.loginUserService = exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findOne({ email: data.email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(data.password, salt);
    const user = yield user_model_1.User.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
    return user;
});
exports.createUserService = createUserService;
const loginUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email }).populate("role");
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }
    const accessToken = jsonwebtoken_1.default.sign({ email: user.email, role: user.role, id: user._id }, process.env.JWT_SECRETKEY, { expiresIn: "7d" });
    return {
        token: accessToken,
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role.role,
        },
    };
});
exports.loginUserService = loginUserService;
