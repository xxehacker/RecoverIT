import LostItem from "../models/lostItem.model.js";
import FoundItem from "../models/foundItem.model.js";
import ClaimItem from "../models/claimItem.model.js";
import User from "../models/user.model.js";

const getAdminDashboardData = async (req, res) => {
  try {
    const [
      lostItems,
      foundItems,
      claimItems,
      totalUsers,

      totalPendingLostItems,
      totalApprovedLostItems,
      totalRejectedLostItems,

      totalPendingFoundItems,
      totalApprovedFoundItems,
      totalRejectedFoundItems,
      totalClaimedFoundItems,

      totalPendingClaimItems,
      totalApprovedClaimItems,
      totalRejectedClaimItems,
      totalPendingInReviewClaimItems,
    ] = await Promise.all([
      LostItem.countDocuments({}),
      FoundItem.countDocuments({}),
      ClaimItem.countDocuments({}),
      User.countDocuments({}),

      LostItem.countDocuments({ status: "pending" }),
      LostItem.countDocuments({ status: "approved" }),
      LostItem.countDocuments({ status: "rejected" }),

      FoundItem.countDocuments({ status: "pending" }),
      FoundItem.countDocuments({ status: "approved" }),
      FoundItem.countDocuments({ status: "rejected" }),
      FoundItem.countDocuments({ status: "claimed" }),

      ClaimItem.countDocuments({ status: "pending" }),
      ClaimItem.countDocuments({ status: "approved" }),
      ClaimItem.countDocuments({ status: "rejected" }),
      ClaimItem.countDocuments({ status: "inReview" }),
    ]);

    // get all users
    const allUsers = await User.find({}).select("-password");

    // claim items
    const allClaimItems = await ClaimItem.find({})
      .populate("foundItemId", "title description location foundDate images")
      .populate("userId", "username email");

    // Fetch recent 10 claim items
    const recentClaimItems = await ClaimItem.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("foundItemId description claimDate contactInformation status");

    return res.status(200).json({
      counts: {
        lostItems,
        foundItems,
        claimItems,
        totalUsers,
      },
      lostItems: {
        pending: totalPendingLostItems,
        approved: totalApprovedLostItems,
        rejected: totalRejectedLostItems,
      },
      foundItems: {
        pending: totalPendingFoundItems,
        approved: totalApprovedFoundItems,
        rejected: totalRejectedFoundItems,
        claimed: totalClaimedFoundItems,
      },
      claimItems: {
        pending: totalPendingClaimItems,
        approved: totalApprovedClaimItems,
        rejected: totalRejectedClaimItems,
        inReview: totalPendingInReviewClaimItems,
        allClaimItems,
      },
      users: allUsers,
      recentClaimItems,
    });
  } catch (error) {
    console.error("Error while getting admin dashboard data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserDashboardData = async (req, res) => {
  try {
    const user = req.user;
  } catch (error) {
    console.error("Error while getting user dashboard data:", error);
  }
};
export { getAdminDashboardData, getUserDashboardData };
