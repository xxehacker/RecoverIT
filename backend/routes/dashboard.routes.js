import express from "express";
import { protectRoute, isAdmin } from "../middlewares/auth.middleware.js";
import {
  getAdminDashboardData,
  getUserDashboardData,
} from "../controllers/dashboard.controller.js";
const router = express.Router();

// admin dashboard
router.get("/admin", protectRoute, isAdmin, getAdminDashboardData);

// user dashboard
router.get("/user", protectRoute, getUserDashboardData);

export default router;
