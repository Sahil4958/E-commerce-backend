import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  checkoutFromCartService,
  getOrderByIdService,
  getOrdersByUserService,
  updateOrderService,
  cancelOrderService,
  listOrderedProductsService,
  totalExpensesService,
} from "../service/order.service";
import { apiResponse } from "../utils/apiResponse";
import { handleError } from "../utils/errHandler";

export const checkoutFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const order = await checkoutFromCartService(userId, req.body);
    return apiResponse(res, StatusCodes.CREATED, "Order placed", order);
  } catch (error) {
    handleError(res, error);
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await getOrderByIdService(req.params.id);
    if (!order)
      return apiResponse(res, StatusCodes.NOT_FOUND, "Order not found");
    return apiResponse(res, StatusCodes.OK, "Order fetched", order);
  } catch (error) {
    handleError(res, error);
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const orders = await getOrdersByUserService(userId);
    return apiResponse(res, StatusCodes.OK, "Orders fetched", orders);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await updateOrderService(req.params.id, req.body);
    if (!order)
      return apiResponse(res, StatusCodes.NOT_FOUND, "Order not found");
    return apiResponse(res, StatusCodes.OK, "Order updated", order);
  } catch (error) {
    handleError(res, error);
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const order = await cancelOrderService(req.params.id);
    if (!order)
      return apiResponse(res, StatusCodes.NOT_FOUND, "Order not found");
    return apiResponse(res, StatusCodes.OK, "Order cancelled", order);
  } catch (error) {
    handleError(res, error);
  }
};

export const listOrderedProducts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const items = await listOrderedProductsService(userId);
    return apiResponse(res, StatusCodes.OK, "Ordered products", items);
  } catch (error) {
    handleError(res, error);
  }
};

export const totalExpenses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const from = req.query.from ? new Date(String(req.query.from)) : undefined;
    const to = req.query.to ? new Date(String(req.query.to)) : undefined;
    const total = await totalExpensesService(userId, from, to);
    return apiResponse(res, StatusCodes.OK, "Total expenses", {
      total,
      from,
      to,
    });
  } catch (error) {
    handleError(res, error);
  }
};
