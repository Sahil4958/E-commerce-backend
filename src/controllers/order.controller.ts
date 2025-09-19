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
  updateOrderStatusService,
} from "../service/order.service";
import { apiResponse } from "../utils/apiResponse";
import { handleError } from "../utils/errHandler";
import { Order } from "../models/order.model";
import { messages } from "../utils/message";

export const checkoutFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userInfo?.id;
    const order = await checkoutFromCartService(userId, req.body);
    return apiResponse(res, StatusCodes.CREATED, messages.ORDER_PLACED, order);
  } catch (error) {
    handleError(res, error);
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await getOrderByIdService(req.params.id);
    if (!order) {
      return apiResponse(res, StatusCodes.NOT_FOUND, messages.ORDER_NOT_FOUND);
    }
    return apiResponse(res, StatusCodes.OK, messages.ORDER_FETCHED, order);
  } catch (error) {
    handleError(res, error);
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userInfo?.id;
    const orders = await getOrdersByUserService(userId);
    return apiResponse(res, StatusCodes.OK, messages.ORDER_FETCHED, orders);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const user = (req as any).userInfo;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return apiResponse(res, StatusCodes.NOT_FOUND, messages.ORDER_NOT_FOUND);
    }
    if (req.body.status && user.role !== "ADMIN") {
      return apiResponse(
        res,
        StatusCodes.FORBIDDEN,
        "Only admin can update order status"
      );
    }

    if (
      user.role !== "ADMIN" &&
      ["shipped", "delivered"].includes(order.status)
    ) {
      return apiResponse(
        res,
        StatusCodes.FORBIDDEN,
        "You cannot update this order now"
      );
    }

    const updatedOrder = await updateOrderService(req.params.id, req.body);
    return apiResponse(
      res,
      StatusCodes.OK,
      messages.ORDER_UPDATED,
      updatedOrder
    );
  } catch (error) {
    handleError(res, error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const order = await updateOrderStatusService(req.params.id, status);
    if (!order) {
      return apiResponse(res, StatusCodes.NOT_FOUND, messages.ORDER_NOT_FOUND);
    }
    return apiResponse(
      res,
      StatusCodes.OK,
      messages.ORDER_STATUS_UPDATED,
      order
    );
  } catch (error) {
    handleError(res, error);
  }
};

export const listOrderedProducts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userInfo?.id;
    const items = await listOrderedProductsService(userId);
    return apiResponse(res, StatusCodes.OK, messages.ORDERED_PRODUCTS, items);
  } catch (error) {
    handleError(res, error);
  }
};

export const totalExpenses = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userInfo?.id;
    const from = req.query.from ? new Date(String(req.query.from)) : undefined;
    const to = req.query.to ? new Date(String(req.query.to)) : undefined;
    const total = await totalExpensesService(userId, from, to);
    return apiResponse(res, StatusCodes.OK, messages.ORDER_EXPENSE, {
      total,
      from,
      to,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const order = await cancelOrderService(req.params.id);
    if (!order) {
      return apiResponse(
        res,
        StatusCodes.BAD_REQUEST,
        messages.ORDER_NOT_FOUND
      );
    }
    return apiResponse(res, StatusCodes.OK, messages.ORDER_CANCELLED, order);
  } catch (error) {
    handleError(res, error);
  }
};
