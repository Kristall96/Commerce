import React from "react";
import { useCart } from "../context/CartContext";
import "./cart.css";
const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item._id} className="cart-item">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h4>{item.title}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>
              <strong>Total:</strong> ${total.toFixed(2)}
            </p>
            <button onClick={clearCart}>Clear Cart</button>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
