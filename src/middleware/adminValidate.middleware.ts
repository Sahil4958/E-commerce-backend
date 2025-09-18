import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { User } from "../models/user.model";
import { apiResponse } from "../utils/apiResponse";
import { messages } from "../utils/message";
declare global {
  namespace Express {
    interface Request {
      user?: { role?: string; [key: string]: any };
    }
  }
}

export const authorization = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userInfo.id;
  const roleDoc: any = await User.findOne({ _id: userId }).populate("role");
  const userRole = roleDoc?.role.role;
  if (userRole === "ADMIN") {
    next();
  } else {
    apiResponse(res, StatusCodes.UNAUTHORIZED, messages.UNAUTHORIZED);
  }
};
