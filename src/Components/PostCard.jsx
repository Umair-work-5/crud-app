import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post, handleDelete }) => {
  return (
    <div className="bg-[#2c2c2c] p-5 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col justify-between min-h-[250px]">
  <div>
    <h3 className="text-lg font-semibold text-white mb-3">{post.title}</h3>
    <p className="text-gray-300 text-sm">{post.body}</p>
  </div>

  <div className="mt-4 flex justify-end gap-2">
    <Link
      to={`/edit/${post.id}`}
      className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition"
    >
      Edit
    </Link>
    <button
      onClick={() => handleDelete(post.id)}
      className="bg-rose-500 text-white px-3 py-1 rounded hover:bg-rose-600 transition"
    >
      Delete
    </button>
  </div>
</div>

  );
};

export default PostCard;
