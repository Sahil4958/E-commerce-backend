import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getCartByUserService,
  addToCartService,
  updateCartItemQtyService,
  removeFromCartService,
  clearCartService,
} from "../service/cart.service";
import { apiResponse } from "../utils/apiResponse";
import { handleError } from "../utils/errHandler";
import { messages } from "../utils/message";

export const getMyCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userInfo?.id;
    if (!userId) {
      return apiResponse(res, StatusCodes.UNAUTHORIZED, messages.INVALID_USER);
    }
    const cart = await getCartByUserService(userId);
    return apiResponse(
      res,
      StatusCodes.OK,
      messages.CART_FETCHED,
      cart ?? { items: [] }
    );
  } catch (error) {
    handleError(res, error);
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.userInfo?.id;
    if (!userId) {
      return apiResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        "User not authenticated"
      );
    }

    const { productId, qty } = req.body as { productId: string; qty?: number };
    const cart = await addToCartService(userId, productId, Number(qty ?? 1));
    return apiResponse(res, StatusCodes.OK, messages.ITEM_ADDED_TO_CART, cart);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateCartItemQty = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userInfo?.id;
    const { productId, qty } = req.body as { productId: string; qty: number };
    const cart = await updateCartItemQtyService(userId, productId, Number(qty));
    return apiResponse(res, StatusCodes.OK, "Cart updated", cart);
  } catch (error) {
    handleError(res, error);
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userInfo?.id;
    const { productId } = req.body as { productId: string };
    const cart = await removeFromCartService(userId, productId);
    return apiResponse(res, StatusCodes.OK, messages.CART_ITEM_REMOVED, cart);
  } catch (error) {
    handleError(res, error);
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userInfo?.id;
    const cart = await clearCartService(userId);
    return apiResponse(res, StatusCodes.OK, messages.CART_CLEARED, cart);
  } catch (error) {
    handleError(res, error);
  }
};
