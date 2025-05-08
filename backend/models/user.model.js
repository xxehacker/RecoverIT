import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      min: 6 || "Password must be at least 6 characters long",
      max: 40 || "Password must be at most 40 characters long",
      trim: true,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
