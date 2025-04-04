// components/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../../api/config";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCart(data.items || []);
  };

  const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    fetchCart();
  };

  const updateQuantity = async (productId, quantity) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/cart/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/cart/remove/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
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
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
