import mongoose from "mongoose";

const foundItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    foundDate: { type: Date, required: true },
    images: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "claimed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FoundItem = mongoose.model("FoundItem", foundItemSchema);

export default FoundItem;
