import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import Blog from "./components/pages/Blog";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/Profile";
import PrivateRoute from "./components/routes/PrivateRoute";
import NotFound from "./components/pages/NotFound";
import SingleProduct from "./components/singleProduct/SingleProduct";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product/:id" element={<SingleProduct />} />{" "}
          <Route path="/profile" element={<PrivateRoute />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
