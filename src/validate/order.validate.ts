import { z } from "zod";

export const createOrderBody = z.object({
  user: z.string().min(1, "User ID is required"),
  items: z
    .array(
      z.object({
        product: z.string().min(1, "Product ID is required"),
        qty: z.coerce.number().int().min(1),
        price: z.coerce.number().min(0),
      })
    )
    .min(1, "Order must have at least one item"),
  totalAmount: z.coerce.number().min(0),
  status: z
    .enum(["placed", "shipped", "delivered", "cancelled"])
    .default("placed"),
  expectedDelivery: z.coerce.date().optional(),
  extra: z
    .object({
      address: z
        .object({
          line1: z.string().min(1),
          line2: z.string().optional(),
          city: z.string().min(1),
          state: z.string().min(1),
          zip: z.string().min(1),
          country: z.string().min(1),
        })
        .optional(),
      shippingMethod: z.enum(["standard", "express"]).optional(),
      notes: z.string().optional(),
    })
    .optional(),
});

export const checkoutBody = z.object({
  address: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
    country: z.string().min(1),
  }),
  shippingMethod: z.enum(["standard", "express"]).default("standard"),
  notes: z.string().optional(),
});

export const updateOrderBody = z.object({
  status: z.enum(["placed", "shipped", "delivered", "cancelled"]).optional(),
  expectedDelivery: z.coerce.date().optional(),
  extra: z
    .object({
      address: z
        .object({
          line1: z.string().min(1),
          line2: z.string().optional(),
          city: z.string().min(1),
          state: z.string().min(1),
          zip: z.string().min(1),
          country: z.string().min(1),
        })
        .optional(),
      shippingMethod: z.enum(["standard", "express"]).optional(),
      notes: z.string().optional(),
    })
    .optional(),
});

export const expensesQuery = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});

export type CheckoutBody = z.infer<typeof checkoutBody>;
export type UpdateOrderBody = z.infer<typeof updateOrderBody>;
export type ExpensesQuery = z.infer<typeof expensesQuery>;
