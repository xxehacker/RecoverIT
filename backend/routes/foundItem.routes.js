import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  createFoundItem,
  getFoundItems,
  getFoundItem,
  updateFoundItem,
  deleteFoundItem,
} from "../controllers/foundItem.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/").get(getFoundItems);
router.route("/report").post(protectRoute, upload.array("images"), createFoundItem);
router.route("/report/:id").get(protectRoute, getFoundItem);
router.route("/report/:id").delete(protectRoute, deleteFoundItem);
router.route("/report/:id").put(protectRoute, updateFoundItem);

export default router;
