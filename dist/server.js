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
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const db_1 = require("./config/db");
const seeder_1 = require("./utils/seeder");
const swagger_1 = require("./utils/swagger");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, db_1.connectDb)();
    (0, seeder_1.createAdmin)();
    (0, seeder_1.seedRole)();
    (0, swagger_1.setupSwagger)(app_1.default);
    app_1.default.listen(config_1.config.port, () => {
        console.log(`Server is running on port http://localhost:${config_1.config.port}`);
        console.log(`Swagger docs on http://localhost:${config_1.config.port}/api-docs`);
    });
});
start();
