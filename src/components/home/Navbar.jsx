import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import AccountModal from "./AccountModal";
import "./Navbar.css";

function Navbar() {
  const { user } = useContext(AuthContext);
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [showModal, setShowModal] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [showWishlistPreview, setShowWishlistPreview] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* Hamburger */}
        <div className="nav-left">
          <div className="hamburger-menu" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>

        {/* Logo */}
        <div className="nav-logo">
          <Link to="/" onClick={closeMobileMenu}>
            <img className="logo" src="/logo.png" alt="Logo" />
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="nav-center">
          <ul className="nav-links-desktop">
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
        </div>

        {/* Actions */}
        <div className="nav-actions">
          <button
            className="user-btn"
            onClick={() => !user && setShowModal(true)}
          >
            <Link to={user ? "/profile" : "#"}>
              {user ? user.username : "Account"}
            </Link>
          </button>

          {/* Wishlist */}
          <div
            className="cart-wrapper"
            onMouseEnter={() => setShowWishlistPreview(true)}
            onMouseLeave={() => setShowWishlistPreview(false)}
          >
            <div className="cart-icon">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="cart-count-badge">{wishlistCount}</span>
              )}
            </div>
            {showWishlistPreview && wishlist.length > 0 && (
              <div className="cart-preview">
                <ul>
                  {wishlist.slice(0, 3).map((item) => (
                    <li key={item._id} className="cart-preview-item">
                      <img src={item.images?.[0]} alt={item.title} />
                      <div>
                        <p>{item.title}</p>
                        <p className="preview-price">${item.price}</p>
                        <div className="cart-preview-controls">
                          <button
                            className="remove-btn"
                            onClick={() => toggleWishlist(item._id)}
                          >
                            ✕
                          </button>
                          <button
                            className="add-btn"
                            onClick={() => {
                              addToCart(item._id, 1);
                              toggleWishlist(item._id);
                            }}
                          >
                            + Cart
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {wishlist.length > 3 && (
                  <p className="cart-more">+ {wishlist.length - 3} more...</p>
                )}
                <div className="cart-preview-actions">
                  <Link to="/wishlist" className="view-cart-btn">
                    View Wishlist
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <div
            className="cart-wrapper"
            onMouseEnter={() => setShowCartPreview(true)}
            onMouseLeave={() => setShowCartPreview(false)}
          >
            <div className="cart-icon">
              <ShoppingCart size={20} />
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
        </div>
      </nav>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <ul className="nav-links-mobile">
          <li>
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={closeMobileMenu}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={closeMobileMenu}>
              Blog
            </Link>
          </li>
        </ul>
      )}

      {showModal && <AccountModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Navbar;
