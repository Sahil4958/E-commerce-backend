import { Types } from "mongoose";
import { IRole } from "./role.interface";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Types.ObjectId | IRole;
  isDeleted: boolean;
}
