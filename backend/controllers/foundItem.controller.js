import FoundItem from "../models/foundItem.model.js";
import User from "../models/user.model.js";

const getFoundItems = async (req, res) => {
  try {
    const foundItems = await FoundItem.find({}).sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ foundItems, message: "Found items fetched successfully" });
  } catch (error) {
    console.log("error while getting found items", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const createFoundItem = async (req, res) => {
  try {
    const { title, description, location, foundDate } = req.body;

    if (!title || !description || !location || !foundDate) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // handle images
    let imagesToSave = [];

    if (req?.files && req?.files.length > 0) {
      imagesToSave = req.files.map((file) => file.path.replace(/\\/g, "/"));
    } else {
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });
    }
    console.log("imagesToSave", imagesToSave);

    const foundItem = await FoundItem.create({
      userId: user._id,
      title,
      description,
      location,
      foundDate,
      images: imagesToSave,
    });

    return res
      .status(201)
      .json({ foundItem, message: "Found item created successfully" });
  } catch (error) {
    console.log("error while creating found item", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getFoundItem = async (req, res) => {
  try {
    const foundItem = await FoundItem.findById(req.params.id);
    if (!foundItem) {
      return res.status(404).json({ message: "Found item not found" });
    }
    return res
      .status(200)
      .json({ foundItem, message: "Found item fetched successfully" });
  } catch (error) {
    console.log("error while getting found item", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const deleteFoundItem = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const foundItem = await FoundItem.findById(req.params.id);
    if (!foundItem) {
      return res.status(404).json({ message: "Found item not found" });
    }

    if (foundItem.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await FoundItem.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Found item deleted successfully" });
  } catch (error) {
    console.log("error while deleting found item", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateFoundItem = async (req, res) => {};

export {
  getFoundItems,
  createFoundItem,
  getFoundItem,
  updateFoundItem,
  deleteFoundItem,
};
