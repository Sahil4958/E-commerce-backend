import { z } from "zod";

export const addToCartBody = z.object({
  productId: z.string().min(1, "Product ID is required"),
  qty: z.coerce.number().int().min(1).default(1),
});

export const updateQtyBody = z.object({
  productId: z.string().min(1, "Product ID is required"),
  qty: z.coerce.number().int(),
});

export const removeItemBody = z.object({
  productId: z.string().min(1, "Product ID is required"),
});

export type AddToCartBody = z.infer<typeof addToCartBody>;
export type UpdateQtyBody = z.infer<typeof updateQtyBody>;
export type RemoveItemBody = z.infer<typeof removeItemBody>;
