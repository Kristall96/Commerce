import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import AccountModal from "./AccountModal";
import "./Navbar.css";

function Navbar() {
  const { user } = useContext(AuthContext);
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="navbar">
        <span className="nav-logo">
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

        <span className="nav-actions">
          {user ? (
            <div className="user-dropdown">
              <button className="user-btn">
                <Link to="/profile">{user.username}</Link>
              </button>
            </div>
          ) : (
            <button onClick={() => setShowModal(true)}>Account</button>
          )}

          <div
            className="cart-wrapper"
            onMouseEnter={() => setShowCartPreview(true)}
            onMouseLeave={() => setShowCartPreview(false)}
          >
            <div className="cart-icon">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="cart-count-badge">{totalItems}</span>
              )}
            </div>
            {showCartPreview && cart.length > 0 && (
              <div className="cart-preview">
                <ul>
                  {cart.slice(0, 3).map((item) => (
                    <li key={item._id} className="cart-preview-item">
                      <img src={item.images?.[0]} alt={item.title} />
                      <div>
                        <p>{item.title}</p>
                        <div className="cart-preview-controls">
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item._id)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {cart.length > 3 && (
                  <p className="cart-more">+ {cart.length - 3} more...</p>
                )}
                <div className="cart-preview-actions">
                  <Link to="/cart" className="view-cart-btn">
                    Go to Cart
                  </Link>
                  <button className="clear-cart-btn" onClick={clearCart}>
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        </span>
      </nav>

      {showModal && <AccountModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Navbar;
