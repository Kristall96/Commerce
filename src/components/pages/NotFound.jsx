// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={{ textAlign: "center", padding: "4rem" }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist or is private.</p>
    <Link to="/">← Go Home</Link>
  </div>
);

export default NotFound;
