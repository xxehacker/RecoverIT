import express from "express";
import { protectRoute, isAdmin } from "../middlewares/auth.middleware.js";
import {
  updateLostItem,
  updateClaimItem,
  updateFoundItem,
  deleteClaimItem,
  deleteLostItem,
  deleteUser,
  deleteFoundItem,
} from "../controllers/admin.controllers.js";

const router = express.Router();

// all update routes
// update lost item
router.put("/lost-items/:id", protectRoute, isAdmin, updateLostItem);
// update claim item
router.put("/claim-items/:id", protectRoute, isAdmin, updateClaimItem);
// update found item
router.put("/found-items/:id", protectRoute, isAdmin, updateFoundItem);

// all delete routes
// delete lost item
router.delete("/lost-items/:id", protectRoute, isAdmin, deleteLostItem);
// delete claim item
router.delete("/claim-items/:id", protectRoute, isAdmin, deleteClaimItem);
// delete user
router.delete("/users/:id", protectRoute, isAdmin, deleteUser);
// delete found item
router.delete("/found-items/:id", protectRoute, isAdmin, deleteFoundItem);

export default router;
