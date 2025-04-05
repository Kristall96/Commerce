import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const moveToCart = async (productId) => {
    await addToCart(productId, 1);
    await toggleWishlist(productId);
  };

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-heading">Your Wishlist</h2>

      <div className="wishlist-grid">
        {wishlist.length === 0 ? (
          <p className="empty-text">Your wishlist is empty.</p>
        ) : (
          wishlist.map((item) => (
            <div key={item._id} className="wishlist-card fancy-shadow">
              <div className="wishlist-image-wrapper">
                <img src={item.images?.[0]} alt={item.title} />
              </div>
              <div className="wishlist-info">
                <h3>{item.title}</h3>
                <p className="wishlist-price">${item.price}</p>
                <div className="wishlist-buttons">
                  <button
                    className="remove-btn"
                    onClick={() => toggleWishlist(item._id)}
                  >
                    ❌ Remove
                  </button>
                  <button
                    className="move-btn"
                    onClick={() => moveToCart(item._id)}
                  >
                    🛒 Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
