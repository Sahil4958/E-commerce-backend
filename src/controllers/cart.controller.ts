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

export const getMyCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const cart = await getCartByUserService(userId);
    return apiResponse(res, StatusCodes.OK, "Cart fetched", cart ?? { items: [] });
  } catch (e) { handleError(res, e); }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { productId, qty } = req.body as { productId: string; qty?: number };
    const cart = await addToCartService(userId, productId, Number(qty ?? 1));
    return apiResponse(res, StatusCodes.OK, "Item added to cart", cart);
  } catch (e) { handleError(res, e); }
};

export const updateCartItemQty = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { productId, qty } = req.body as { productId: string; qty: number };
    const cart = await updateCartItemQtyService(userId, productId, Number(qty));
    return apiResponse(res, StatusCodes.OK, "Cart updated", cart);
  } catch (e) { handleError(res, e); }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { productId } = req.body as { productId: string };
    const cart = await removeFromCartService(userId, productId);
    return apiResponse(res, StatusCodes.OK, "Item removed from cart", cart);
  } catch (e) { handleError(res, e); }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const cart = await clearCartService(userId);
    return apiResponse(res, StatusCodes.OK, "Cart cleared", cart);
  } catch (e) { handleError(res, e); }
};
