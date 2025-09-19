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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const config_1 = require("../config");
var Cloudinary;
(function (Cloudinary) {
    cloudinary_1.v2.config({
        cloud_name: config_1.config.cloud_name,
        api_key: config_1.config.api_key,
        api_secret: config_1.config.api_secret,
    });
    Cloudinary.uploadToCloudinary = (file, isBeingCalled) => __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve, reject) => {
                const folderMap = {
                    emp: "ecommerce",
                };
                const folderValue = isBeingCalled && folderMap[isBeingCalled]
                    ? folderMap[isBeingCalled]
                    : undefined;
                const stream = cloudinary_1.v2.uploader.upload_stream({ folder: folderValue, public_id: file.originalname.split(".")[0] }, (error, result) => {
                    if (error)
                        return reject(error);
                    resolve(result);
                });
                const readableStream = new stream_1.Readable();
                readableStream.push(file.buffer);
                readableStream.push(null);
                readableStream.pipe(stream);
            });
        }
        catch (error) {
            console.error("Cloudinary error:", error);
            throw new Error("Cloudinary upload failed");
        }
    });
})(Cloudinary || (exports.Cloudinary = Cloudinary = {}));
