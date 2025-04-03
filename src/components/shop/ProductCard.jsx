import React, { useState, useEffect } from "react";
import StarRating from "../ui/StarRating";
import "./productCard.css";

const ProductCard = ({ product }) => {
  const [localRatings, setLocalRatings] = useState(product.ratings || []);
  const [rated, setRated] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // ✅ Check if user already rated this product
  useEffect(() => {
    if (user?._id && product.ratings?.length > 0) {
      const alreadyRated = product.ratings.some(
        (r) => r.user === user._id || r.user?._id === user._id
      );
      setRated(alreadyRated);
    }
  }, [product.ratings, user]);

  const averageRating =
    localRatings.length > 0
      ? (
          localRatings.reduce((acc, r) => acc + r.score, 0) /
          localRatings.length
        ).toFixed(1)
      : 0;

  const handleRate = async (score) => {
    if (rated) return alert("You’ve already rated this product.");
    if (!token || !user?._id) return alert("Please log in to rate.");

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
            comment: "",
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setLocalRatings((prev) => [...prev, { score, user: user._id }]);
        setRated(true);
      } else {
        alert(data.message || "Rating failed.");
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

      <StarRating
        rating={averageRating}
        onRate={handleRate}
        interactive={!!user && !rated}
      />

      <div className="product-actions">
        <button className="wishlist-btn">♡ Wishlist</button>
        <button className="cart-btn">+ Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
