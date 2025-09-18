import { z } from "zod";

export const productZodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().nonnegative("Price must be a positive number"),
  images: z.array(z.string().url("Each image must be a valid URL")).optional(),
  category: z.string().optional(),
  stock: z.coerce.number().int().nonnegative().default(0),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

export type ProductInput = z.infer<typeof productZodSchema>;

export const updateProductZodSchema = productZodSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductZodSchema>;
