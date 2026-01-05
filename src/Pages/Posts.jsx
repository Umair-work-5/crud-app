import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../APIs/axiosInstance";
import PostCard from "../Components/PostCard";
import toast from "react-hot-toast";

const STORAGE_KEY = "crud_posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchAndMergePosts();
  }, []);

  const fetchAndMergePosts = async () => {
    try {
      setLoading(true);

      // 1️⃣ Get API posts
      const apiResponse = await axiosInstance.get("/posts");
      const apiPosts = apiResponse.data;

      // 2️⃣ Get local posts
      const localPosts =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      // 3️⃣ Merge without duplicates (local first)
      const mergedPosts = [
        ...localPosts,
        ...apiPosts.filter(
          (apiPost) =>
            !localPosts.some(
              (localPost) => localPost.id === apiPost.id
            )
        ),
      ];

      // 4️⃣ Save merged list
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(mergedPosts)
      );

      // 5️⃣ Update UI
      setPosts(mergedPosts);
    } catch (error) {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/posts/${id}`);

      const updatedPosts = posts.filter((post) => post.id !== id);

      setPosts(updatedPosts);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedPosts)
      );

      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.body.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        Loading posts...
      </p>
    );

  return (
    <div className="w-full px-6 py-10 bg-[#f3f4f6] min-h-screen pt-32">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6 text-center uppercase tracking-wide">
        All Posts
      </h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400 transition"
        />
      </div>

      <div className="flex justify-end mb-6">
        <Link
          to="/add"
          className="bg-[#059669] text-white px-5 py-2 rounded-xl hover:bg-[#047857] shadow-md transition"
        >
          Add New Post
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full mt-6">
            No posts found
          </p>
        )}
      </div>
    </div>
  );
};

export default Posts;
