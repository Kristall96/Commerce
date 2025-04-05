import React, { useEffect, useState } from "react";
import ProductCard from "../shop/ProductCard";
import { BASE_URL } from "../../api/config";
import "./limitedEdition.css";

const LimitedEdition = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLimitedEdition = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/limited-edition`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching limited edition:", err);
      }
    };
    fetchLimitedEdition();
  }, []);

  return (
    <div className="limited-edition-section">
      <h2 className="gradient-text">Limited Edition</h2>
      <div className="product-grid seven-column-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LimitedEdition;
