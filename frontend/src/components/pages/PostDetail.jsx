import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    API.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  const addComment = async () => {
    await API.post(`/posts/${id}/comment`, { text });
    const res = await API.get(`/posts/${id}`);
    setPost(res.data);
    setText("");
  };

  if (!post)
    return (
      <p className="text-center mt-4 text-muted">Loading...</p>
    );

  return (
    <div className="container feed-container">
      {/* Post */}
      <div className="card mb-3">
        <div className="card-body">
          <h6 className="fw-bold mb-2">
            {post.userId.firstName}
          </h6>

          <img
            src={post.image}
            className="img-fluid rounded mb-2"
            alt="post"
          />

          <p>{post.caption}</p>
        </div>
      </div>

      {/* Comments */}
      <div className="card">
        <div className="card-body">
          <h6 className="mb-3">Comments</h6>

          {post.comments.length === 0 && (
            <p className="text-muted">No comments yet</p>
          )}

          {post.comments.map((c, i) => (
            <p className="mb-1" key={i}>
              <b>{c.user.firstName}:</b> {c.text}
            </p>
          ))}

          <div className="mt-3">
            <input
              className="form-control mb-2"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Write comment"
            />

            <button
              className="btn btn-primary btn-sm w-100"
              onClick={addComment}
              disabled={!text.trim()}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;