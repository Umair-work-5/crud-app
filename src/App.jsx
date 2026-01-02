import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Posts from "./Pages/Posts";
import AddPost from "./Pages/AddPost";
import EditPost from "./Pages/EditPost";
import Navbar from "./Components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
