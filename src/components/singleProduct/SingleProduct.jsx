import React from "react";
import { useParams } from "react-router-dom";
import "./SingleProduct.css";

function SingleProduct() {
  const { id } = useParams();

  const productData = {
    "galaxy-mug": {
      name: "Galaxy Mug",
      price: "$14.99",
      image: "/images/galaxy-mug.jpg",
      description:
        "Sip your favorite brew while gazing into the stars with our Galaxy Mug. A cosmic favorite!",
    },
    "matte-mug": {
      name: "Minimalist Matte",
      price: "$12.49",
      image: "/images/matte-mug.jpg",
      description:
        "Clean lines, simple vibes. The Minimalist Matte mug is perfect for aesthetic lovers.",
    },
  };

  const product = productData[id];

  if (!product)
    return <h2 style={{ textAlign: "center" }}>Product not found 🥲</h2>;

  return (
    <div className="product-page">
      <img src={product.image} alt={product.name} className="product-image" />

      <div className="product-details">
        <h1>{product.name}</h1>
        <p className="product-price">{product.price}</p>
        <p className="product-desc">{product.description}</p>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
}

export default SingleProduct;
