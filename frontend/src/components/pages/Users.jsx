import React, { useEffect, useState } from "react";
import API from "../../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loggedInUserId = localStorage.getItem("userId");

  const fetchUsers = async () => {
    const res = await API.get("/users/allusers");
    setUsers(res.data);
  };

  const fetchLoggedUser = async () => {
    const res = await API.get(`/users/${loggedInUserId}/profile`);
    setLoggedInUser(res.data.user);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await fetchUsers();
        await fetchLoggedUser();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [loggedInUserId]);

  const handleFollowToggle = async (targetId) => {
    try {
      await API.post(`/users/${targetId}/follow`);
      setLoggedInUser((prev) => {
        if (!prev) return prev;
        const isFollowing = prev.following.some(
          (fid) =>
            fid._id?.toString() === targetId ||
            fid.toString() === targetId
        );

        return {
          ...prev,
          following: isFollowing
            ? prev.following.filter(
                (fid) =>
                  fid._id?.toString() !== targetId &&
                  fid.toString() !== targetId
              )
            : [...prev.following, { _id: targetId }],
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-4 text-muted">Loading users...</p>
    );

  return (
    <div className="container feed-container">
      <h4 className="mb-3 text-center">All Users</h4>

      {users
        .filter((user) => user._id !== loggedInUserId)
        .map((user) => {
          const isFollowing = Array.isArray(loggedInUser?.following)
            ? loggedInUser.following.some(
                (fid) =>
                  fid._id?.toString() === user._id.toString() ||
                  fid.toString() === user._id.toString()
              )
            : false;

          return (
            <div className="card mb-2" key={user._id}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <span>
                  {user.firstName} {user.lastName}
                </span>

                <button
                  className={`btn btn-sm ${
                    isFollowing ? "btn-outline-danger" : "btn-outline-primary"
                  }`}
                  onClick={() => handleFollowToggle(user._id)}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Users;