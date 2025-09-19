import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";
import { apiResponse } from "../utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { handleError } from "../utils/errHandler";
import {
  globalMetricsService,
  orderStatusSummaryService,
  salesReportService,
} from "../service/adminDashboard.service";
import { messages } from "../utils/message";

export const listAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    return apiResponse(res, StatusCodes.OK, "Users fetched", users);
  } catch (err) {
    handleError(res, err);
  }
};

export const listAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await Product.find({ isDeleted: { $ne: true } });
    return apiResponse(
      res,
      StatusCodes.OK,
      messages.PRODUCT_LIST_FETCHED,
      products
    );
  } catch (err) {
    handleError(res, err);
  }
};

export const getGlobalMetrics = async (_: Request, res: Response) => {
  try {
    const data = await globalMetricsService();
    return apiResponse(res, StatusCodes.OK, messages.GLOBAL_METRICS, data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getSalesReport = async (req: Request, res: Response) => {
  try {
    const from = new Date(String(req.query.from));
    const to = new Date(String(req.query.to));
    const data = await salesReportService(from, to);
    return apiResponse(res, StatusCodes.OK, messages.SALES_REPORT, data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getOrderStatuses = async (_: Request, res: Response) => {
  try {
    const data = await orderStatusSummaryService();
    return apiResponse(res, StatusCodes.OK, messages.ORDER_STATUSES, data);
  } catch (error) {
    handleError(res, error);
  }
};
