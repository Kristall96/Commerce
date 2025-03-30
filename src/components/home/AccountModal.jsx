import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./AccountModal.css";

function AccountModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(null);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const API_BASE_URL = "http://localhost:5000";

  // Step 1: Check email existence
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsExistingUser(data.exists);
        setEmailChecked(true);
      } else {
        setError(data.message || "Email check failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }
  };

  // Step 2: Login or Register
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const endpoint = isExistingUser ? "login" : "register";
    const body = isExistingUser
      ? { email, password }
      : { email, password, username };

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Store token and user
        localStorage.setItem("token", data.token);
        login(data.user, data.token); // make sure login in AuthContext supports this
        onClose();
      } else {
        setError(data.message || "Authentication failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {!emailChecked ? (
          <form onSubmit={handleEmailSubmit}>
            <h2>Enter your email</h2>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <button type="submit">Next</button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <h2>{isExistingUser ? "Welcome back!" : "Create an account"}</h2>

            {!isExistingUser && (
              <input
                type="text"
                required
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}

            <input type="email" value={email} readOnly />

            <input
              type="password"
              required
              placeholder={
                isExistingUser ? "Enter your password" : "Create a password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              {isExistingUser ? "Sign In" : "Register"}
            </button>
          </form>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default AccountModal;
