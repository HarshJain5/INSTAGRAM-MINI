import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchFeed = async () => {
    const res = await API.get("/posts/feed");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleLike = async (postId) => {
    await API.post(`/posts/${postId}/like`);
    fetchFeed();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container feed-container">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Home Feed</h4>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {posts.length === 0 && (
        <p className="text-muted text-center">
          No posts to show. Follow users to see their posts.
        </p>
      )}

      {posts.map((post) => {
        const isLiked = post.likes.some(
          (id) => id.toString() === userId
        );

        return (
          <div className="card mb-4" key={post._id}>
            <div className="card-body">
              {/* User */}
              <Link
                to={`/profile/${post.userId._id}`}
                className="text-decoration-none"
              >
                <h6 className="fw-bold mb-2">
                  {post.userId.firstName} {post.userId.lastName}
                </h6>
              </Link>

              {/* Image */}
              <img
                src={post.image}
                className="img-fluid rounded mb-2"
                alt="post"
              />

              {/* Caption */}
              <p className="mb-2">{post.caption}</p>

              {/* Actions */}
              <div className="d-flex align-items-center gap-3">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleLike(post._id)}
                >
                  {isLiked ? "❤ Unlike" : "🤍 Like"}
                </button>

                <span className="text-muted">
                  {post.likes.length} Likes
                </span>
              </div>

              <Link
                to={`/post/${post._id}`}
                className="d-block mt-2 text-decoration-none"
              >
                View Post
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;