import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AccountModal from "./AccountModal";
import "./Navbar.css";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="navbar">
        <span>
          <img className="logo" src="/logo.png" alt="Logo" />
        </span>

        <span>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </span>

        <span>
          {user ? (
            <div className="user-dropdown">
              <button className="user-btn">
                <Link to="/profile">{user.username}</Link>
              </button>
            </div>
          ) : (
            <button onClick={() => setShowModal(true)}>Account</button>
          )}
        </span>
      </nav>

      {showModal && <AccountModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Navbar;
