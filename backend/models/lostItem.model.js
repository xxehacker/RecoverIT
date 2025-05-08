import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    dateLost: { type: Date, required: true },
    images: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const LostItem = mongoose.model("LostItem", lostItemSchema);
export default LostItem;
