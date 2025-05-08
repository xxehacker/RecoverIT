import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    }
    // console.log("decoded", decoded);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - Token error" });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized - You are not authorized",
      });
  }
  next();
};
