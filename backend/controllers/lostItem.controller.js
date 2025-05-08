import LostItem from "../models/lostItem.model.js";
import User from "../models/user.model.js";

const getLostItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find({})
      .populate("userId", "username")
      .sort({ createdAt: -1 }); // -1 for descending
    return res.status(200).json({ lostItems });
  } catch (error) {
    console.log("error while getting lost items", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createLostItem = async (req, res) => {
  try {
    const { title, description, location, dateLost } = req.body;
    console.log(req.body);

    if (!title || !description || !location || !dateLost) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Only authenticated users can create lost items
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle image upload
    let imagesToSave = [];

    if (req?.files && req?.files.length > 0) {
      imagesToSave = req.files.map((file) => file.path.replace(/\\/g, "/"));
    } else {
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });
    }

    const lostItemCreated = await LostItem.create({
      userId: user._id,
      title,
      description,
      location,
      dateLost,
      images: imagesToSave,
    });

    return res.status(201).json({
      message: "Lost item created successfully",
      lostItem: lostItemCreated,
    });
  } catch (error) {
    console.error("Error while creating lost item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getLostItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const lostItem = await LostItem.findById(id).populate(
      "userId",
      "username email"
    );
    if (!lostItem) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    console.log("lostItem", lostItem);

    return res.status(200).json({
      lostItem,
      message: "Lost item fetched successfully",
    });
  } catch (error) {
    console.log("error while getting lost item", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const deleteLostItem = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const lostItem = await LostItem.findById(id).populate("userId");
    console.log("lostItem", lostItem);

    if (!lostItem) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    // Authorization check: Only the owner of the lost item can delete it
    // We populate the userId field to get the full user object, then compare the owner's ID
    // with the currently logged-in user's ID to ensure proper authorization
    if (lostItem.userId.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this item" });
    }

    await LostItem.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Lost item deleted successfully",
    });
  } catch (error) {
    console.log("error while deleting lost item", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateLostItem = async (req, res) => {};

export {
  getLostItems,
  createLostItem,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
};
