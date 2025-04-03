import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/config";
import StarRating from "../ui/StarRating";
import "./SingleProduct.css";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();

        if (res.ok) {
          const found = data.products?.find((p) => p._id === id);
          if (found) {
            setProduct(found);
          } else {
            setError("Product not found.");
          }
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

  if (error) return <div className="error">{error}</div>;
  if (!product) return <div>Loading product...</div>;

  const averageRating =
    product.ratings.length > 0
      ? (
          product.ratings.reduce((acc, r) => acc + r.score, 0) /
          product.ratings.length
        ).toFixed(1)
      : "No ratings";

  return (
    <div className="single-product-container">
      <img src={product.image} alt={product.title} className="single-image" />

      <div className="single-details">
        <h2>{product.title}</h2>
        <p className="price">${product.price}</p>
        <StarRating rating={averageRating} interactive={false} />
        <p className="desc">{product.description || "No description."}</p>

        <ul className="product-meta">
          <li>
            <strong>Material:</strong> {product.material}
          </li>
          <li>
            <strong>Color:</strong> {product.color}
          </li>
          <li>
            <strong>Capacity:</strong> {product.capacity}ml
          </li>
          <li>
            <strong>Pattern:</strong> {product.pattern}
          </li>
          <li>
            <strong>In Stock:</strong>{" "}
            {product.inStock ? "Yes" : "Out of Stock"}
          </li>
        </ul>

        <button className="add-cart-btn">+ Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;
