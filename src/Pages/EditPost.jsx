import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../APIs/axiosInstance";
import toast from "react-hot-toast";

const STORAGE_KEY = "crud_posts";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 1️⃣ Try localStorage first
        const localPosts =
          JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        const localPost = localPosts.find(
          (post) => post.id.toString() === id
        );

        if (localPost) {
          setTitle(localPost.title);
          setBody(localPost.body);
        } else {
          // 2️⃣ Fallback to API
          const response = await axiosInstance.get(`/posts/${id}`);
          setTitle(response.data.title);
          setBody(response.data.body);
        }
      } catch (error) {
        toast.error("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      // API update (simulated)
      await axiosInstance.put(`/posts/${id}`, { title, body });

      // Update localStorage
      const existingPosts =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      const updatedPosts = existingPosts.map((post) =>
        post.id.toString() === id
          ? { ...post, title, body }
          : post
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedPosts)
      );

      toast.success("Post updated successfully!");
      navigate("/posts");
    } catch (error) {
      toast.error("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400 text-lg">
        Loading post...
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa] px-6 py-10">
      <div className="w-full max-w-lg bg-[#ffffff] p-10 rounded-3xl shadow-2xl border border-[#e0e0e0]">
        <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8 text-center">
          Edit Post
        </h2>

        <form className="flex flex-col space-y-6" onSubmit={handleUpdate}>
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
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
