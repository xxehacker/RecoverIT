import LostItem from "../models/lostItem.model.js";
import ClaimItem from "../models/claimItem.model.js";
import User from "../models/user.model.js";
import FoundItem from "../models/foundItem.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.log("error while getting all users", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllClaims = async (req, res) => {
  try {
    const claims = await ClaimItem.find()
      .populate("foundItemId", "title description location foundDate images")
      .populate("userId", "username email role");

    return res.status(200).json({
      message: "Claims fetched successfully",
      claims,
    });
  } catch (error) {
    console.log("error while getting all claims", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateLostItem = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const lostItem = await LostItem.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );

    if (!lostItem) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    return res.status(200).json({
      message: "Lost item updated successfully",
      lostItem,
    });
  } catch (error) {
    console.log("error while updating lost item", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateClaimItem = async (req, res) => {
  try {
    let { id, status, reviewDate } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (reviewDate) {
      reviewDate = new Date(reviewDate);
    } else {
      reviewDate = null;
    }

    const claimItem = await ClaimItem.findByIdAndUpdate(
      id,
      {
        status,
        reviewDate,
      },
      { new: true }
    );

    if (!claimItem) {
      return res.status(404).json({ message: "Claim item not found" });
    }

    return res.status(200).json({
      message: "Claim item updated successfully",
      claimItem,
    });
  } catch (error) {
    console.log("error while updating claim item", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateFoundItem = async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const foundItem = await FoundItem.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );

    if (!foundItem) {
      return res.status(404).json({ message: "Found item not found" });
    }

    return res.status(200).json({
      message: "Found item updated successfully",
      foundItem,
    });
  } catch (error) {
    console.log("error while updating found item", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteLostItem = async (req, res) => {
  try {
    const { id } = req.params;

    const lostItem = await LostItem.findByIdAndDelete(id);

    if (!lostItem) {
      return res.status(404).json({ message: "Lost item not found" });
    }

    return res.status(200).json({
      message: "Lost item deleted successfully",
      lostItem,
    });
  } catch (error) {
    console.log("error while deleting lost item", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteClaimItem = async (req, res) => {
  try {
    const { id } = req.params;

    const claimItem = await ClaimItem.findByIdAndDelete(id);

    if (!claimItem) {
      return res.status(404).json({ message: "Claim item not found" });
    }

    return res.status(200).json({
      message: "Claim item deleted successfully",
      claimItem,
    });
  } catch (error) {
    console.log("error while deleting claim item", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.log("error while deleting user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteFoundItem = async (req, res) => {
  try {
    const { id } = req.params;

    const foundItem = await FoundItem.findByIdAndDelete(id);
    if (!foundItem) {
      return res.status(404).json({ message: "Found item not found" });
    }

    return res.status(200).json({
      message: "Found item deleted successfully",
      foundItem,
    });
  } catch (error) {
    console.log("error while deleting found item", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  updateLostItem,
  updateClaimItem,
  updateFoundItem,
  deleteClaimItem,
  deleteLostItem,
  deleteUser,
  deleteFoundItem,
  getAllUsers,
  getAllClaims,
};
