import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { apiResponse } from "../utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { messages } from "../utils/message";

export const validate = (schemas: {
  body?: ZodType<any>;
  query?: ZodType<any>;
  params?: ZodType<any>;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const result = schemas.body.safeParse(req.body);
        if (!result.success) {
          apiResponse(
            res,
            StatusCodes.BAD_REQUEST,
            messages.INVALID_BODY,
            result.error.issues
          );
        }
        req.body = result.data;
      }

      if (schemas.query) {
        const result = schemas.query.safeParse(req.query);
        if (!result.success) {
          apiResponse(
            res,
            StatusCodes.BAD_REQUEST,
            messages.INVALID_QUERY,
            result.error.issues
          );
        }
        req.query = result.data;
      }

      if (schemas.params) {
        const result = schemas.params.safeParse(req.params);
        if (!result.success) {
          apiResponse(
            res,
            StatusCodes.BAD_REQUEST,
            messages.INVALID_PARAMS,
            result.error.issues
          );
        }
        req.params = result.data;
      }

      next();
    } catch (err) {
      console.error("Zod validation middleware error:", err);
      apiResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        messages.VALIDATION_ERROR
      );
    }
  };
};
