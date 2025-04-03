import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../api/config";
import "./ShopContent.css"; // Optional: create this for styling

const ShopContent = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const limit = 25; // Show 25 mugs per page

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
        <p>No mugs found.</p>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </div>
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
