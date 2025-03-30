import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import SingleProduct from "./components/singleProduct/SingleProduct";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
