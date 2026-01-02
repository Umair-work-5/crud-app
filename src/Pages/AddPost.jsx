import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../APIs/axiosInstance";
import toast from "react-hot-toast";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/posts", { title, body });
      toast.success("Post created successfully!");
      setTitle("");
      setBody("");
      navigate("/posts");
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] px-6 py-10">
      <div className="w-full max-w-lg bg-[#ffffff] p-10 rounded-3xl shadow-2xl border border-[#e0e0e0]">
        <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8 text-center">
          Add New Post
        </h2>

        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full px-4 py-3 border border-[#cbd5e1] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1e40af] transition placeholder-[#9ca3af] text-[#111827]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-2">
              Body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter body"
              rows={5}
              className="w-full px-4 py-3 border border-[#cbd5e1] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1e40af] transition placeholder-[#9ca3af] text-[#111827]"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1e40af] text-white rounded-2xl hover:bg-[#1e3a8a] transition font-medium"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
