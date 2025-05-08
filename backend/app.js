import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";
import lostItemRouter from "./routes/lostItem.routes.js";
import foundItemRouter from "./routes/foundItem.routes.js";
import contactRouter from "./routes/contact.routes.js";
import claimItemRouter from "./routes/claimItem.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import adminRouter from "./routes/admin.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/lostItems", lostItemRouter);
app.use("/api/v1/foundItems", foundItemRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/claimItems", claimItemRouter);

// user management routes by admin
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/admin", adminRouter);

export { app };
