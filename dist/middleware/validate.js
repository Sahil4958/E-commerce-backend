"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validate = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const http_status_codes_1 = require("http-status-codes");
const message_1 = require("../utils/message");
const validate = (schemas) => {
    return (req, res, next) => {
        try {
            if (schemas.body) {
                const result = schemas.body.safeParse(req.body);
                if (!result.success) {
                    (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, message_1.messages.INVALID_BODY, result.error.issues);
                }
                req.body = result.data;
            }
            if (schemas.query) {
                const result = schemas.query.safeParse(req.query);
                if (!result.success) {
                    (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, message_1.messages.INVALID_QUERY, result.error.issues);
                }
                req.query = result.data;
            }
            if (schemas.params) {
                const result = schemas.params.safeParse(req.params);
                if (!result.success) {
                    (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, message_1.messages.INVALID_PARAMS, result.error.issues);
                }
                req.params = result.data;
            }
            next();
        }
        catch (err) {
            console.error("Zod validation middleware error:", err);
            (0, apiResponse_1.apiResponse)(res, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message_1.messages.VALIDATION_ERROR);
        }
    };
};
exports.validate = validate;
const validateQuery = (schema) => {
    return (req, res, next) => {
        try {
            const validated = schema.parse(req.query);
            req.validatedQuery = validated; // ✅ add to req
            next();
        }
        catch (err) {
            return res.status(400).json({
                status: "fail",
                message: "Validation error",
                error: err instanceof Error ? err.message : err,
            });
        }
    };
};
exports.validateQuery = validateQuery;
