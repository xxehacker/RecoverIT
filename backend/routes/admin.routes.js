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
  getAllUsers,
  getAllClaims,
} from "../controllers/admin.controllers.js";

const router = express.Router();

// all get routes
// get all users
router.get("/users", protectRoute, isAdmin, getAllUsers);
// get all claims
router.get("/claimItems", protectRoute, isAdmin, getAllClaims);

// all update routes
// update lost item
router.put("/update-lost-item", protectRoute, isAdmin, updateLostItem);
// update claim item
router.put("/update-claim-item", protectRoute, isAdmin, updateClaimItem);
// update found item
router.put("/update-found-item", protectRoute, isAdmin, updateFoundItem);

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
