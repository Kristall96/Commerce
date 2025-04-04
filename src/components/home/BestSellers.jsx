// components/pages/BestSellers.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../shop/ProductCard";
import { BASE_URL } from "../../api/config";
import "./bestSellers.css";

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/best-sellers`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };
    fetchBestSellers();
  }, []);

  return (
    <div className="best-sellers-section">
      <h2 className="gradient-text">Best Sellers</h2>
      <div className="product-grid seven-column-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
