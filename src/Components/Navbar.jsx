import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">CRUD App</h1>

      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/posts" className="hover:text-gray-300">Posts</Link>
        <Link to="/add" className="hover:text-gray-300">Add Post</Link>
      </div>
    </nav>
  );
};

export default Navbar;
