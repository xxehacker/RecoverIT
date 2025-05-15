import Visitor from "../models/visitor.model.js";
import DeviceDetector from "device-detector-js";

const visitorCountMiddleware = async (req, res, next) => {
  try {
    const userAgent = req?.headers["user-agent"];
    const ip =
      req?.headers["x-forwarded-for"] ||
      req?.socket?.remoteAddress ||
      "unknown";

    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(userAgent);
    const deviceType = device.device?.type || "desktop";

    console.log("deviceType", deviceType, "ip", ip);

    await Visitor.create({
      ip,
      deviceType,
    });
  } catch (error) {
    console.error("Error tracking visitor:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }

  next();
};

export default visitorCountMiddleware;
