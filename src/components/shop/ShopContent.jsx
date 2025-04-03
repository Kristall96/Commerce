import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { BASE_URL } from "../../api/config";
import "./ShopContent.css";

const categories = [
  "best-seller",
  "most-liked",
  "new-arrival",
  "limited-edition",
  "seasonal",
  "staff-picks",
  "classic-collection",
];

const materials = ["Ceramic", "Glass", "Stainless Steel", "Plastic", "Clay"];
const colors = ["White", "Black", "Red", "Blue", "Green", "Pink"];

const ShopContent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [exactRating, setExactRating] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setSelectedColors([]);
    setPriceRange([0, 100]);
    setInStockOnly(false);
    setMinRating(0);
    setSearch("");
    setSortOrder("");
    setPage(1);
  };

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

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedMaterials.length > 0) {
      filtered = filtered.filter((product) =>
        selectedMaterials.includes(product.material)
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColors.includes(product.color)
      );
    }

    if (inStockOnly) {
      filtered = filtered.filter((product) => product.inStock);
    }

    if (exactRating !== null) {
      filtered = filtered.filter((product) => {
        const avg =
          product.ratings.reduce((acc, r) => acc + r.score, 0) /
          (product.ratings.length || 1);
        return Math.round(avg) === exactRating;
      });
    } else if (minRating > 0) {
      filtered = filtered.filter((product) => {
        const avg =
          product.ratings.reduce((acc, r) => acc + r.score, 0) /
          (product.ratings.length || 1);
        return avg >= minRating;
      });
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortOrder === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [
    search,
    selectedCategories,
    selectedMaterials,
    selectedColors,
    priceRange,
    inStockOnly,
    minRating,
    exactRating,
    sortOrder,
    products,
  ]);

  const toggleSelection = (value, setter, current) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  return (
    <div className="shop-layout">
      <aside className="sidebar">
        <h3 className="filter-title">Categories</h3>
        {categories.map((cat) => (
          <label key={cat} className="checkbox-label cool-filter">
            <input
              type="checkbox"
              value={cat}
              checked={selectedCategories.includes(cat)}
              onChange={() =>
                toggleSelection(cat, setSelectedCategories, selectedCategories)
              }
            />
            <span>{cat.replace(/-/g, " ")}</span>
          </label>
        ))}

        <h3 className="filter-title">Material</h3>
        {materials.map((m) => (
          <label key={m} className="checkbox-label cool-filter">
            <input
              type="checkbox"
              value={m}
              checked={selectedMaterials.includes(m)}
              onChange={() =>
                toggleSelection(m, setSelectedMaterials, selectedMaterials)
              }
            />
            <span>{m}</span>
          </label>
        ))}

        <h3 className="filter-title">Color</h3>
        {colors.map((color) => (
          <label key={color} className="checkbox-label cool-filter">
            <input
              type="checkbox"
              value={color}
              checked={selectedColors.includes(color)}
              onChange={() =>
                toggleSelection(color, setSelectedColors, selectedColors)
              }
            />
            <span>{color}</span>
          </label>
        ))}

        <h3 className="filter-title">Price Range</h3>
        <div className="range-display">
          ${priceRange[0]} - ${priceRange[1]}
        </div>
        <div className="range-slider-container">
          <div className="slider-base" />
          <div
            className="slider-track"
            style={{
              left: `${(priceRange[0] / 100) * 100}%`,
              width: `${((priceRange[1] - priceRange[0]) / 100) * 100}%`,
            }}
          ></div>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([
                Math.min(+e.target.value, priceRange[1] - 1),
                priceRange[1],
              ])
            }
            className="range-thumb"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([
                priceRange[0],
                Math.max(+e.target.value, priceRange[0] + 1),
              ])
            }
            className="range-thumb"
          />
        </div>

        <h3 className="filter-title">Stock</h3>
        <label className="checkbox-label cool-filter">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => setInStockOnly((prev) => !prev)}
          />
          <span>In stock only</span>
        </label>

        <h3 className="filter-title">Rating</h3>
        {[5, 4, 3, 2, 1].map((r) => (
          <label key={`min-${r}`} className="checkbox-label cool-filter">
            <input
              type="radio"
              name="rating"
              checked={minRating === r && exactRating === null}
              onChange={() => {
                setMinRating(r);
                setExactRating(null);
              }}
            />
            <span>{r}+ stars</span>
          </label>
        ))}

        <h3 className="filter-title">Exact Rating</h3>
        {[5, 4, 3, 2, 1].map((r) => (
          <label key={`exact-${r}`} className="checkbox-label cool-filter">
            <input
              type="radio"
              name="exactRating"
              checked={exactRating === r}
              onChange={() => {
                setExactRating(r);
                setMinRating(0);
              }}
            />
            <span>{r} stars only</span>
          </label>
        ))}

        <label className="checkbox-label cool-filter">
          <input
            type="radio"
            name="rating"
            checked={minRating === 0 && exactRating === null}
            onChange={() => {
              setMinRating(0);
              setExactRating(null);
            }}
          />
          <span>All Ratings</span>
        </label>
        <button className="reset-btn" onClick={resetFilters}>
          Reset Filters
        </button>
      </aside>

      <div className="shop-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search mugs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="sort-dropdown"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="empty-message">🫙 No mugs matched your criteria ☕</p>
        ) : (
          <>
            <div className="product-grid">
              {filteredProducts.map((product) => (
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
    </div>
  );
};

export default ShopContent;
