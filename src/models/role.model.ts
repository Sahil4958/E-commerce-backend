import { Document, model, Schema } from "mongoose";
import { IRole } from "../interface/role.interface";

export interface IRoleModel extends IRole, Document {}

const roleSchema = new Schema<IRoleModel>(
  {
    role: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Role = model<IRoleModel>("Role", roleSchema);
