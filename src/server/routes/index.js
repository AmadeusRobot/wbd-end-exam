import { Router } from "express";

import adminRouter from "./adminRoutes";
import appointmentRouter from "./appointmentRoutes";
import userRouter from "./userRoutes";
import paymentRouter from "./paymentRoutes";

const app = Router();

app.use("/admin", adminRouter);
app.use("/appointment", appointmentRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);

export default app;
