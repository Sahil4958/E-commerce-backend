import { Document, model, Schema, Types } from "mongoose";
import { IUser } from "../interface/user.interfae";

export interface IUserModel extends IUser, Document {}

export const userSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      ref: "Role",
      type: Schema.Types.ObjectId,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = model<IUserModel>("User", userSchema);
