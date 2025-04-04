import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StarRating from "../ui/StarRating";
import { useCart } from "../context/CartContext"; // ✅ import
import "./productCard.css";

const ProductCard = ({ product }) => {
  const [localRatings, setLocalRatings] = useState(product.ratings || []);
  const [rated, setRated] = useState(false);
  const [feedback, setFeedback] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const { addToCart } = useCart(); // ✅ access cart context

  // ✅ Check if user already rated
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

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please log in to add to cart.");
    try {
      await addToCart(product._id, 1);
      setFeedback("✅ Added to cart");
      setTimeout(() => setFeedback(""), 2500);
    } catch (err) {
      console.error("Add to cart error:", err);
      setFeedback("❌ Failed to add to cart");
    }
  };

  return (
    <div className="product-card-wrapper">
      <Link to={`/product/${product._id}`} className="product-card-link">
        <div className="product-card">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="product-image"
          />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price}</p>

          <StarRating
            rating={averageRating}
            onRate={handleRate}
            interactive={!!user && !rated}
          />

          <div className="product-actions" onClick={(e) => e.preventDefault()}>
            <button className="wishlist-btn">♡ Wishlist</button>
            <button className="cart-btn" onClick={handleAddToCart}>
              + Add to Cart
            </button>
            {feedback && <p className="cart-feedback">{feedback}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
