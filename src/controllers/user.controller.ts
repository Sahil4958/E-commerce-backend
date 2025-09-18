import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUserService, loginUserService } from "../service/user.service";
import { apiResponse } from "../utils/apiResponse";
import { messages } from "../utils/message";
import { handleError } from "../utils/errHandler";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);

    apiResponse(res, StatusCodes.CREATED, messages.USER_REGISTERED, {
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUserService(email, password);

    apiResponse(res, StatusCodes.OK, messages.USER_LOGIN_SUCCESS, result);
  } catch (error) {
    return handleError(res, error);
  }
};
