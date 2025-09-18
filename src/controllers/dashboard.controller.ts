import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  kpiService,
  revenueTimeseriesService,
  topProductsService,
  lowStockService,
  orderStatusBreakdownService,
  newUsersTimeseriesService,
} from "../service/dashboard.service";
import { apiResponse } from "../utils/apiResponse";
import { handleError } from "../utils/errHandler";

const parseRange = (req: Request) => {
  const from = req.query.from ? new Date(String(req.query.from)) : undefined;
  const to = req.query.to ? new Date(String(req.query.to)) : undefined;
  return { from, to };
};

export const getKpis = async (req: Request, res: Response) => {
  try {
    const { from, to } = parseRange(req);
    const data = await kpiService(from, to);
    return apiResponse(res, StatusCodes.OK, "KPIs", data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getRevenueTimeseries = async (req: Request, res: Response) => {
  try {
    const { from, to } = parseRange(req);
    if (!from || !to)
      return apiResponse(
        res,
        StatusCodes.BAD_REQUEST,
        "from and to are required"
      );
    const data = await revenueTimeseriesService(from, to);
    return apiResponse(res, StatusCodes.OK, "Revenue timeseries", data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getTopProducts = async (req: Request, res: Response) => {
  try {
    const { from, to } = parseRange(req);
    const limit = Number(req.query.limit ?? 10);
    const data = await topProductsService(limit, from, to);
    return apiResponse(res, StatusCodes.OK, "Top products", data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getLowStock = async (req: Request, res: Response) => {
  try {
    const threshold = Number(req.query.threshold ?? 5);
    const data = await lowStockService(threshold);
    return apiResponse(res, StatusCodes.OK, "Low stock", data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getOrderStatusBreakdown = async (req: Request, res: Response) => {
  try {
    const { from, to } = parseRange(req);
    const data = await orderStatusBreakdownService(from, to);
    return apiResponse(res, StatusCodes.OK, "Order status breakdown", data);
  } catch (error) {
    handleError(res, error);
  }
};

export const getNewUsersTimeseries = async (req: Request, res: Response) => {
  try {
    const { from, to } = parseRange(req);
    if (!from || !to)
      return apiResponse(
        res,
        StatusCodes.BAD_REQUEST,
        "from and to are required"
      );
    const data = await newUsersTimeseriesService(from, to);
    return apiResponse(res, StatusCodes.OK, "New users timeseries", data);
  } catch (error) {
    handleError(res, error);
  }
};
