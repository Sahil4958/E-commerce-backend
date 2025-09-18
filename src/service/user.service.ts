import bcrypt from "bcrypt";
import { User, IUserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const createUserService = async (
  data: Partial<IUserModel>
): Promise<IUserModel> => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password as string, salt);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return user;
};

export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ email }).populate("role");

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  const accessToken = jwt.sign(
    { email: user.email, role: user.role, id: user._id as Types.ObjectId },
    process.env.JWT_SECRETKEY as string,
    { expiresIn: "7d" }
  );

  return {
    token: accessToken,
    user: {
      id: (user._id as Types.ObjectId).toString(),
      name: user.name,
      email: user.email,
      role: (user.role as any)?.role,
    },
  };
};
