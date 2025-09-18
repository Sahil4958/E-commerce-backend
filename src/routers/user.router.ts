import express from "express";
import { validate } from "../middleware/validate";
import {
  registerValidateSchema,
  loginValidateSchema,
} from "../validate/user.validate";
import {
  loginUserController,
  registerUser,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validate({ body: registerValidateSchema }),
  registerUser
);


userRouter.post(
  "/login",
  validate({ body: loginValidateSchema }),
  loginUserController
);
export default userRouter;