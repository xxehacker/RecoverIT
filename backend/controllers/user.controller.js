import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate token
const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "12d" });
};

const signupUser = async (req, res) => {
  try {
    const { username, email, password, adminInviteToken } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailValidation.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username must be at least 4 characters long" });
    }

    const userExits = await User.findOne({ email });

    if (userExits) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // assign role
    let role = "student";
    if (
      adminInviteToken &&
      adminInviteToken === process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    }

    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      user: {
        username: userCreated.username,
        email: userCreated.email,
        id: userCreated._id,
        role: userCreated.role,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const loginUser = await User.findOne({ email });
    if (!loginUser) {
      return res.status(400).json({ message: "Invalid login credentials" });
    }

    const isMatch = await bcryptjs.compare(password, loginUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid login credentials" });
    }

    // Generate token - 12 days and store username , email , id , role
    const token = generateToken({
      username: loginUser.username,
      email: loginUser.email,
      id: loginUser._id,
      role: loginUser.role,
    });

    return res.status(200).json({
      user: {
        username: loginUser.username,
        email: loginUser.email,
        id: loginUser._id,
        role: loginUser.role,
        token,
      },
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
        role: user.role,
      },
      message: "User profile fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { signupUser, loginUser, getUserProfile };
