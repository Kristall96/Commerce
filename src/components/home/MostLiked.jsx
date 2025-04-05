// components/pages/MostLiked.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../shop/ProductCard";
import { BASE_URL } from "../../api/config";
import "./bestSellers.css";

function MostLiked() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMostLiked = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/most-liked`);
        const data = await res.json();
        setProducts(data.products?.slice(0, 7) || []);
      } catch (error) {
        console.error("Error fetching most liked products:", error);
      }
    };

    fetchMostLiked();
  }, []);

  return (
    <div className="most-liked-section">
      <h2 className="gradient-text">Most Liked</h2>
      <div className="product-grid seven-column-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default MostLiked;
