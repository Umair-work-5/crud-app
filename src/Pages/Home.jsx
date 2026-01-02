import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f7fa] px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-[#1e3a8a] mb-6 tracking-wide text-center">
        Welcome to React CRUD App
      </h1>
      <p className="text-gray-600 text-lg mb-12 text-center max-w-lg">
        Easily manage your posts with React, Axios, and TailwindCSS. Create, read, update, and delete your posts with a modern interface.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          to="/posts"
          className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-8 py-3 rounded-2xl font-medium shadow-md transition-all duration-300"
        >
          View All Posts
        </Link>
        <Link
          to="/add"
          className="bg-[#059669] hover:bg-[#047857] text-white px-8 py-3 rounded-2xl font-medium shadow-md transition-all duration-300"
        >
          Add New Post
        </Link>
      </div>
    </div>
  );
};

export default Home;
