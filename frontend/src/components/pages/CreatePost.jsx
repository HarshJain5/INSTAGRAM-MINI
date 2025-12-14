import { useState } from "react";
import API from "../../services/api";

const CreatePost = () => {
  const [form, setForm] = useState({ image: "", caption: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/posts/create", form);
      alert("Post created");
      setForm({ image: "", caption: "" });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="container feed-container">
      <div className="card">
        <div className="card-body">
          <h5 className="mb-3 text-center">Create New Post</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                className="form-control"
                placeholder="Paste image URL"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Caption</label>
              <input
                className="form-control"
                placeholder="Write a caption"
                value={form.caption}
                onChange={(e) =>
                  setForm({ ...form, caption: e.target.value })
                }
              />
            </div>

            <button className="btn btn-primary w-100">
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;