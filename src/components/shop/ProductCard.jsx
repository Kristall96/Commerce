import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StarRating from "../ui/StarRating";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./productCard.css";

const ProductCard = ({ product }) => {
  const [localRatings, setLocalRatings] = useState(product.ratings || []);
  const [rated, setRated] = useState(false);
  const [feedback, setFeedback] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const isInWishlist = wishlist.some((item) => item._id === product._id);

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

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please log in to use wishlist.");
    try {
      await toggleWishlist(product._id);
      setFeedback(
        isInWishlist ? "💔 Removed from wishlist" : "❤️ Added to wishlist"
      );
      setTimeout(() => setFeedback(""), 2500);
    } catch (err) {
      console.error("Wishlist error:", err);
      setFeedback("❌ Wishlist error");
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
            <button
              className={`wishlist-btn ${isInWishlist ? "in-wishlist" : ""}`}
              onClick={handleToggleWishlist}
            >
              {isInWishlist ? "♥ Wishlist" : "♡ Wishlist"}
            </button>
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
