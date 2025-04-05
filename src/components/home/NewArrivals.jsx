// components/pages/NewArrivals.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../shop/ProductCard";
import { BASE_URL } from "../../api/config";
import "./newArrivals.css";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/new-arrivals`);
        const data = await res.json();
        setProducts(data.products?.slice(0, 7) || []);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="new-arrivals-section">
      <h2 className="gradient-text">New Arrivals</h2>
      <div className="product-grid seven-column-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
