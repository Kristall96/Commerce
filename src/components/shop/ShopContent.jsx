import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { BASE_URL } from "../../api/config";
import "./ShopContent.css";

const ShopContent = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const limit = 25;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${BASE_URL}/api/products?page=${page}&limit=${limit}`
        );
        const data = await res.json();

        if (res.ok) {
          setProducts(data.products);
          setPages(data.pages);
        } else {
          throw new Error(data.message || "Failed to fetch products");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div className="shop-container">
      <h2>Our Mugs</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : products.length === 0 ? (
        <p className="empty-message">🫙 No mugs matched your criteria ☕</p>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="pagination">
            {[...Array(pages).keys()].map((p) => (
              <button
                key={p + 1}
                onClick={() => setPage(p + 1)}
                className={p + 1 === page ? "active" : ""}
              >
                {p + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShopContent;
