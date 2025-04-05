import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../api/config";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const getToken = () => localStorage.getItem("token");

  const fetchCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    const token = getToken();
    try {
      const res = await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      await fetchCart();
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const token = getToken();
    try {
      const res = await fetch(`${BASE_URL}/api/cart/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) throw new Error("Failed to update quantity");
      await fetchCart();
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };

  const removeFromCart = async (productId) => {
    const token = getToken();
    try {
      const res = await fetch(`${BASE_URL}/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to remove from cart");
      await fetchCart();
    } catch (err) {
      console.error("Remove from cart error:", err);
    }
  };

  const clearCart = async () => {
    const token = getToken();
    try {
      await Promise.all(
        cart.map((item) =>
          fetch(`${BASE_URL}/api/cart/remove/${item._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setCart([]);
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadCart = async () => {
      if (isMounted) await fetchCart();
    };

    loadCart();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
