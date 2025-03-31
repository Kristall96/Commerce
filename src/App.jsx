import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout components
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";

// Public pages
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import Blog from "./components/pages/Blog";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";

// Protected pages
import Profile from "./components/pages/Profile";

// Routes
import PrivateRoute from "./components/routes/PrivateRoute";
import NotFound from "./components/pages/NotFound";

// Product page
import SingleProduct from "./components/singleProduct/SingleProduct";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product/:id" element={<SingleProduct />} />{" "}
          {/* Optional if needed */}
          {/* Protected Route */}
          <Route path="/profile" element={<PrivateRoute />}>
            <Route index element={<Profile />} />
          </Route>
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
