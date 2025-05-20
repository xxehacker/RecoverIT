import ClaimItem from "../models/claimItem.model.js";
import FoundItem from "../models/foundItem.model.js";
import User from "../models/user.model.js";

const submitClaimItem = async (req, res) => {
  const {
    foundItemId,
    title,
    description,
    contactInformation,
    itemIdentifiers,
    meetupPreference,
    additionalNotes,
    claimVerificationMethod,
  } = req.body;
  console.log(
    foundItemId,
    description,
    contactInformation,
    itemIdentifiers,
    meetupPreference,
    additionalNotes,
    claimVerificationMethod
  );

  if (!foundItemId || !title || !description || !contactInformation || !itemIdentifiers) {
    return res.status(400).json({
      message:
        "Found item id, title, description, contact information, item identifiers are required",
    });
  }

  const foundItem = await FoundItem.findById(foundItemId);

  if (!foundItem) {
    return res.status(404).json({ message: "Invalid found item id" });
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // handle images
  let imagesToSave = [];

  if (req?.files && req?.files.length > 0) {
    console.log("req.files", req.files);
    imagesToSave = req.files.map((file) => file.path.replace(/\\/g, "/"));
  } else {
    console.log("no files uploaded");
    return res
      .status(400)
      .json({ message: "Please upload at least one image" });
  }
  console.log("imagesToSave", imagesToSave);

  const createClaimItem = await ClaimItem.create({
    userId: user._id,
    foundItemId,
    title,
    description,
    contactInformation,
    itemIdentifiers,
    meetupPreference,
    additionalNotes,
    attachments: imagesToSave,
    claimVerificationMethod,
  });
  
  return res.status(201).json({
    message: "Claim item created successfully",
    claimItem: createClaimItem,
  });
};

const getClaimItems = async (req, res) => {
  const user = await User.findById(req.user._id);

  // only admin can get all claim items
  if (user.role !== "admin") {
    return res.status(404).json({ message: "You are not authorized" });
  }

  const claimItems = await ClaimItem.find({})
    .populate("userId", "name email role")
    .populate(
      "foundItemId",
      "title description location foundDate images status"
    );

  if (!claimItems) {
    return res.status(404).json({ message: "No claim items found" });
  }

  return res.status(200).json({
    message: "Claim items fetched successfully",
    claimItems,
  });
};

const getClaimItem = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
};

const updateClaimItem = async (req, res) => {};

const deleteClaimItem = async (req, res) => {};

export {
  submitClaimItem,
  getClaimItems,
  getClaimItem,
  updateClaimItem,
  deleteClaimItem,
};
