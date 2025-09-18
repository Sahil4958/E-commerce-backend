import { z } from "zod";
import mongoose from "mongoose";

export const registerValidateSchema = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid role ObjectId",
  }),
  isDeleted: z.boolean().optional().default(false),
});

export const loginValidateSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
