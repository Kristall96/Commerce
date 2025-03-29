import React from "react";
import "./shopContent.css";

function ShopContent() {
  const products = [
    {
      name: "Galaxy Mug",
      price: "$14.99",
      image: "/images/galaxy-mug.jpg",
    },
    {
      name: "Minimalist Matte",
      price: "$12.49",
      image: "/images/matte-mug.jpg",
    },
    {
      name: "Quote Lover's Cup",
      price: "$13.99",
      image: "/images/quote-mug.jpg",
    },
    {
      name: "Pastel Ceramic",
      price: "$11.99",
      image: "/images/pastel-mug.jpg",
    },
  ];

  return (
    <div className="shop-container">
      <h1 className="shop-title">Our Mugs</h1>
      <p className="shop-subtitle">Crafted with love, ready for your shelf.</p>

      <div className="product-grid">
        {products.map((item, index) => (
          <div className="product-card" key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="price">{item.price}</p>
            <button className="buy-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopContent;
