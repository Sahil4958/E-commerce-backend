"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI ||
        "mongodb+srv://sahil_vaidya:SAHILVAIDYA2002@cluster0.edwo7su.mongodb.net/ecommerce-task?retryWrites=true&w=majority&appName=Cluster0",
    jwtSecret: process.env.JWT_SECRETKEY || "wZ@5!t3^Pz*9RkLm2$VcX8qBj0eFhJgN",
    cloud_name: process.env.CLOUD_NAME || "dhd2f4b3m",
    api_key: process.env.API_KEY || "747154912653823",
    api_secret: process.env.API_SECRET || "SRLsXswnLsqa1_eUwnTqEi0-A9A",
};
