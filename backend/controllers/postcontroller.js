const Post = require("../models/Post");
const User=require("../models/User")

exports.createPost = async (req, res) => {
  try {
    const { image, caption } = req.body;

    if (!image || !caption) {
      return res.status(400).json({ message: "All fields required" });
    }

    const post = await Post.create({
      userId: req.user.id, 
      image,
      caption,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const currentUser = await User.findById(currentUserId);

    if (!currentUser) return res.status(404).json({ message: "User not found" });

    // Include followed users + current user
    const usersToFetch = [...currentUser.following, currentUserId];

    const posts = await Post.find({ userId: { $in: usersToFetch } })
      .populate("userId", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.id;

    const index = post.likes.findIndex(
      (id) => id.toString() === userId
    );

    if (index === -1) {
      // LIKE
      post.likes.push(userId);
    } else {
      // UNLIKE
      post.likes.splice(index, 1);
    }

    await post.save();

    res.json({
      message: "Toggled",
      likes: post.likes.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.comments.push({
      user: req.user.id,
      text: req.body.text
    });

    await post.save();
    res.json(post.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("userId", "firstName")
    .populate("comments.user", "firstName");

  res.json(post);
};





