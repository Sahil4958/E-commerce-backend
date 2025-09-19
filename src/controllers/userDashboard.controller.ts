import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { apiResponse } from "../utils/apiResponse";
import { handleError } from "../utils/errHandler";
import * as userDashboard from "../service/userDashboard.service";
import { messages } from "../utils/message";

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userInfo.id;
    const orders = await userDashboard.getUserOrdersService(userId);
    return apiResponse(res, StatusCodes.OK, messages.USER_FOUND, orders);
  } catch (err) {
    handleError(res, err);
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userInfo.id;
    const profile = await userDashboard.getUserProfileService(userId);
    return apiResponse(res, StatusCodes.OK, messages.PROFILE_FETCHED, profile);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userInfo.id;
    const updated = await userDashboard.updateUserProfileService(
      userId,
      req.body
    );
    return apiResponse(res, StatusCodes.OK, messages.PROFILE_UPDATED, updated);
  } catch (err) {
    handleError(res, err);
  }
};
