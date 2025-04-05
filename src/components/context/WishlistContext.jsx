// components/context/WishlistContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../api/config";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setWishlist(data || []);
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  const toggleWishlist = async (productId) => {
    const token = localStorage.getItem("token");

    try {
      if (isInWishlist(productId)) {
        await fetch(`${BASE_URL}/api/wishlist/remove/${productId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await fetch(`${BASE_URL}/api/wishlist/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });
      }
      fetchWishlist();
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
