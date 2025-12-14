import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";

const Profile = () => {
  const { id } = useParams();
  const currentUserId = localStorage.getItem("userId");

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/users/${id}/profile`);
      setUser(res.data.user);
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (!user)
    return <p className="text-center mt-4 text-muted">Loading...</p>;

  const isFollowing = user.followers?.some(
    (f) => f._id === currentUserId
  );

  const handleFollowToggle = async () => {
    try {
      await API.post(
        isFollowing
          ? `/users/${id}/unfollow`
          : `/users/${id}/follow`
      );
      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container feed-container">
      {/* Profile Header */}
      <div className="card mb-3">
        <div className="card-body text-center">
          <h5 className="mb-1">
            {user.firstName} {user.lastName}
          </h5>

          <div className="d-flex justify-content-center gap-4 my-2">
            <span>
              <b>{user.followers?.length || 0}</b> Followers
            </span>
            <span>
              <b>{user.following?.length || 0}</b> Following
            </span>
          </div>

          {currentUserId !== id && (
            <button
              className={`btn btn-sm ${
                isFollowing
                  ? "btn-outline-danger"
                  : "btn-outline-primary"
              }`}
              onClick={handleFollowToggle}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>

      {/* Posts */}
      <h6 className="mb-2">Posts</h6>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div className="card mb-3" key={post._id}>
            <div className="card-body">
              <img
                src={post.image}
                className="img-fluid rounded mb-2"
                alt="post"
              />
              <p className="mb-0">{post.caption}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;