import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  createLostItem,
  getLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
} from "../controllers/lostItem.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/").get(getLostItems);
router
  .route("/report")
  .post(protectRoute, upload.array("images"), createLostItem);
router.route("/report/:id").get(protectRoute, getLostItemById);
router.route("/report/:id").delete(protectRoute, deleteLostItem);
router.route("/report/:id").put(protectRoute, updateLostItem);

export default router;
