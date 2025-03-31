import React from "react";
import "./Message.css";

const Message = ({ type = "info", text, onClose }) => {
  if (!text) return null;

  return (
    <div className={`message ${type}`}>
      <span>{text}</span>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default Message;
