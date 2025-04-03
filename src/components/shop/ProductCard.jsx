import React, { useState } from "react";
import StarRating from "../ui/StarRating";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [localRatings, setLocalRatings] = useState(product.ratings || []);
  const [rated, setRated] = useState(false); // block re-rating in session

  // 🧠 Calculate average rating
  const averageRating =
    localRatings.length > 0
      ? localRatings.reduce((acc, r) => acc + r.score, 0) / localRatings.length
      : 0;

  // 🟡 Handle user rating
  const handleRate = async (score) => {
    if (rated) return alert("You've already rated this product.");

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user?._id) {
      return alert("You must be logged in to rate.");
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${product._id}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            score,
            userId: user._id,
            comment: "", // Optional comment, can be enhanced later
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setLocalRatings((prev) => [...prev, { score }]);
        setRated(true);
      } else {
        alert(data.message || "Failed to submit rating.");
      }
    } catch (err) {
      console.error("Rating error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price}</p>

      {/* ⭐ Rating UI (clickable) */}
      <StarRating
        rating={averageRating}
        onRate={handleRate}
        interactive={!rated}
      />

      <div className="product-actions">
        <button className="wishlist-btn">♡ Wishlist</button>
        <button className="cart-btn">+ Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
