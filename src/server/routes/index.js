import { Router } from "express";

import adminRouter from "./adminRoutes.js";
import appointmentRouter from "./appointmentRoutes.js";
import userRouter from "./userRoutes.js";
import paymentRouter from "./paymentRoutes.js";

const app = Router();

app.use("/admin", adminRouter);
app.use("/appointment", appointmentRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);

export default app;
