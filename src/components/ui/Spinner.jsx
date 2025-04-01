import React from "react";
import "./Spinner.css";

const Spinner = ({ message = "Loading...", fullscreen = false }) => {
  return (
    <div className={`spinner-container ${fullscreen ? "fullscreen" : ""}`}>
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
};

export default Spinner;
