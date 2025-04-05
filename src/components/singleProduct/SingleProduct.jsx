import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/config";
import StarRating from "../ui/StarRating";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./SingleProduct.css";

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data);
        } else {
          throw new Error("Failed to load product");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) return alert("Please login to add items to your cart.");
    try {
      await addToCart(product._id, 1);
      setFeedback("✅ Added to cart!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error("Add to cart error:", err);
      setFeedback("❌ Failed to add to cart.");
    }
  };

  const handleWishlistToggle = async () => {
    if (!token) return alert("Please login to use wishlist.");
    try {
      await toggleWishlist(product._id);
      setFeedback("❤️ Wishlist updated!");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error("Wishlist error:", err);
      setFeedback("❌ Failed to update wishlist.");
    }
  };

  const handleCommentSubmit = async () => {
    if (!user || !token) return alert("Please log in to comment.");
    if (!rating || !comment.trim()) return alert("Please rate and comment.");

    try {
      const res = await fetch(
        `${BASE_URL}/api/products/${product._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user._id,
            score: rating,
            comment,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setProduct((prev) => ({
          ...prev,
          ratings: data.ratings,
        }));
        setComment("");
        setRating(0);
      } else {
        alert(data.message || "Failed to post comment.");
      }
    } catch (err) {
      console.error("Comment error:", err);
    }
  };

  if (error) return <div className="error">{error}</div>;
  if (!product) return <div>Loading product...</div>;

  const averageRating =
    product.ratings.length > 0
      ? (
          product.ratings.reduce((acc, r) => acc + r.score, 0) /
          product.ratings.length
        ).toFixed(1)
      : "No ratings";

  const mainImage = product.images?.[mainImageIndex] || "";
  const isInWishlist = wishlist.some((item) => item._id === product._id);

  return (
    <>
      <div className="single-product-container">
        <div className="product-image-section">
          <img
            src={mainImage}
            alt="Main Product"
            className="main-product-image"
          />
          <div className="thumbnail-list">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`thumbnail ${
                  idx === mainImageIndex ? "active" : ""
                }`}
                onMouseEnter={() => setMainImageIndex(idx)}
              />
            ))}
          </div>
        </div>

        <div className="product-details">
          <h2>{product.title}</h2>
          <p className="price">${product.price}</p>
          <StarRating rating={averageRating} />
          <p className="product-desc">{product.description}</p>

          <p>
            <strong>Material:</strong> {product.material}
          </p>
          <p>
            <strong>Color:</strong> {product.color}
          </p>
          <p>
            <strong>Capacity:</strong> {product.capacity}ml
          </p>
          <p>
            <strong>Pattern:</strong> {product.pattern}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock || 0} left
          </p>
          <p>
            <strong>Rated by:</strong> {product.ratings.length} users
          </p>

          <div className="product-buttons">
            <button className="cart-btn" onClick={handleAddToCart}>
              + Add to Cart
            </button>
            <button
              className={`wishlist-btn ${isInWishlist ? "in-wishlist" : ""}`}
              onClick={handleWishlistToggle}
            >
              {isInWishlist ? "♥ Remove Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>

          {feedback && <p className="cart-feedback">{feedback}</p>}
        </div>
      </div>

      <div className="single-product-container-comments">
        <div className="comment-section">
          <h4>Leave a Comment</h4>
          <StarRating
            rating={rating}
            onRate={(r) => setRating(r)}
            interactive
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your thoughts..."
          />
          <button onClick={handleCommentSubmit} className="submit-comment">
            Submit Review
          </button>
        </div>

        <div className="comments-wrapper">
          <h4>Customer Reviews</h4>
          <div className="existing-comments">
            {product.ratings.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              product.ratings
                .filter((r) => r.comment?.trim())
                .map((r, i) => (
                  <div key={i} className="review-box">
                    <p className="review-user">
                      {r.user?.username || "Anonymous"}
                    </p>
                    <StarRating rating={r.score} />
                    <p className="comment-text">{r.comment}</p>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
