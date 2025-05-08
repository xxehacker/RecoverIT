import express from "express";
import { protectRoute, isAdmin } from "../middlewares/auth.middleware.js";
import {
  createClaimItem,
  getClaimItems,
  getClaimItem,
  updateClaimItem,
  deleteClaimItem,
} from "../controllers/claimItem.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

// get all claim items - admin only
router.route("/").get(protectRoute, isAdmin, getClaimItems);

// create claim item - user only
router
  .route("/")
  .post(protectRoute, upload.array("attachments"), createClaimItem);

// get claim item - user only
router.route("/:id").get(protectRoute, getClaimItem);

// update claim item - admin only
router.route("/:id").put(protectRoute, isAdmin, updateClaimItem);

// delete claim item - admin only
router.route("/:id").delete(protectRoute, isAdmin, deleteClaimItem);

export default router;
