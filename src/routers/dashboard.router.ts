import { Router } from "express";
import {
  getKpis,
  getRevenueTimeseries,
  getTopProducts,
  getLowStock,
  getOrderStatusBreakdown,
  getNewUsersTimeseries,
} from "../controllers/dashboard.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorization } from "../middleware/adminValidate.middleware";
const router = Router();

router.get("/kpis", authMiddleware, authorization, getKpis);
router.get("/revenue", authMiddleware, authorization, getRevenueTimeseries);
router.get("/top-products", authMiddleware, authorization, getTopProducts);
router.get("/low-stock", authMiddleware, authorization, getLowStock);
router.get(
  "/order-status",
  authMiddleware,
  authorization,
  getOrderStatusBreakdown
);
router.get("/new-users", authMiddleware, authorization, getNewUsersTimeseries);

export default router;
