const userTable = require("../models/User");
const Post = require("../models/Post");

exports.toggleFollow = async (req, res) => {
  try {
    const userId = req.user.id;       // logged in user
    const targetId = req.params.id;   // jisko follow/unfollow karna hai

    if (userId === targetId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    const user = await userTable.findById(userId);
    const target = await userTable.findById(targetId);

    const index = user.following.findIndex(
      id => id.toString() === targetId
    );

    if (index === -1) {
      // FOLLOW
      user.following.push(targetId);
      target.followers.push(userId);
    } else {
      // UNFOLLOW
      user.following.splice(index, 1);
      target.followers.pull(userId);
    }

    await user.save();
    await target.save();

    res.json({
      message: "Toggled follow",
      isFollowing: index === -1
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getUserProfile = async (req, res) => {
  try {
    const user = await userTable.findById(req.params.id)
      .select("-password")
      .populate("following", "_id firstName lastName")
      .populate("followers", "_id firstName lastName");

    // Get posts with likes and comments populated
    const posts = await Post.find({ userId: req.params.id })
      .populate("likes", "_id firstName lastName") // who liked
      .populate({
        path: "comments",
        populate: { path: "userId", select: "_id firstName lastName" }
      })
      .sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.alluser= async (req, res) => {
  try {
    const users = await userTable.find().select('-password'); // exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
}