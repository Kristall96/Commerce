import React from "react";
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      <span>
        <img className="logo" src="/logo.png" alt="hello" />
      </span>
      <span>
        <ul className="nav-links">
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
          <li>Contact</li>
          <li>Blog</li>
        </ul>
      </span>
      <span>
        <button>Sign Up</button>
        <button>Log In</button>
      </span>
    </nav>
  );
}

export default Navbar;
