import express from "express";
import Visitor from "../models/visitor.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const total = await Visitor.countDocuments();
  const mobile = await Visitor.countDocuments({ deviceType: "smartphone" });
  const desktop = total - mobile;

  return res.json({ total, mobile, desktop });
});

export default router;
