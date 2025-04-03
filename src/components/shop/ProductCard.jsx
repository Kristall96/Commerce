import React from "react";
import "./ProductCard.css"; // Optional styling file

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price}</p>

      <div className="product-actions">
        <button className="wishlist-btn">♡ Wishlist</button>
        <button className="cart-btn">+ Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
