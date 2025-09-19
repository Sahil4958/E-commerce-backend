import express from "express";
import cors from "cors";
import userRouter from "./routers/user.router";
import productRouter from "./routers/product.router";
import cartRouter from "./routers/cart.router";
import orderRouter from "./routers/order.router";
import dashboardRouter from "./routers/userDashboard.router";
import adminManagementRouter from "./routers/adminDashboard.router";
import userDashboardRouter from "./routers/userDashboard.router";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/admin", adminManagementRouter);
app.use("/api/v1/user", userDashboardRouter);
export default app;
