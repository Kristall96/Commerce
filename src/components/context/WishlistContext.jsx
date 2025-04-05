import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../api/config";

export const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const getToken = () => localStorage.getItem("token");

  const fetchWishlist = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch wishlist");
      const data = await res.json();
      setWishlist(data || []);
    } catch (err) {
      console.error("Fetch wishlist error:", err);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  const toggleWishlist = async (productId) => {
    const token = getToken();
    if (!token) return;

    try {
      const url = isInWishlist(productId)
        ? `${BASE_URL}/api/wishlist/remove/${productId}`
        : `${BASE_URL}/api/wishlist/add`;

      const options = isInWishlist(productId)
        ? {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        : {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId }),
          };

      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Wishlist update failed");

      await fetchWishlist();
    } catch (err) {
      console.error("Toggle wishlist error:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadWishlist = async () => {
      if (isMounted) await fetchWishlist();
    };

    loadWishlist();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
