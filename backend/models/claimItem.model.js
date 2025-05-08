import mongoose from "mongoose";

const claimItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foundItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoundItem",
      required: true,
    },
    description: { type: String, required: true },
    claimDate: {
      type: Date,
      default: Date.now,
    },
    contactInformation: {
      phone: { type: String },
      email: { type: String },
      preferredContactMethod: {
        type: String,
        enum: ["phone", "email", "app"],
        default: "app",
      },
    },
    itemIdentifiers: {
      serialNumber: { type: String },
      uniqueMarks: { type: String },
      purchaseReceipt: { type: String },
    },
    // deliveryAddress: {
    //   streetAddress: { type: String },
    //   cityName: { type: String },
    //   stateOrProvince: { type: String },
    //   postalCode: { type: String },
    //   countryName: { type: String, default: "United States" },
    //   addressNotes: { type: String }, // For delivery instructions or apartment numbers
    // },
    meetupPreference: {
      type: String,
      enum: ["inPerson", "courier", "pickupLocation"],
      default: "inPerson",
    },
    additionalNotes: { type: String },
    attachments: [{ type: String, required: true }], // URLs to attached evidence files
    status: {
      type: String,
      enum: ["pending", "inReview", "approved", "rejected"],
      default: "pending",
    },
    reviewDate: { type: Date },
    claimVerificationMethod: {
      type: String,
      enum: [
        "photoVerification",
        "inPerson",
        "descriptiveMatching",
        "documentProof",
      ],
      default: "photoVerification",
    },
  },
  { timestamps: true }
);

const ClaimItem = mongoose.model("ClaimItem", claimItemSchema);

export default ClaimItem;
