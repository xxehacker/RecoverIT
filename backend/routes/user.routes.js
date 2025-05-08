import express from "express";
import {
  signupUser,
  loginUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/profile").get(protectRoute, getUserProfile);

export default router;
