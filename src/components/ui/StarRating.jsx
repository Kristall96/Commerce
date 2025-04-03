import React, { useState } from "react";

const StarRating = ({ rating = 0, onRate, interactive = false }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleClick = (value) => {
    if (!interactive || typeof onRate !== "function") return;
    setSelected(value);
    onRate(value);
  };

  return (
    <div className="star-rating" style={{ fontSize: "1.4rem" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          style={{
            color:
              hovered >= star || (!hovered && (selected || rating) >= star)
                ? "#ffc107"
                : "#555",
            cursor: interactive ? "pointer" : "default",
            marginRight: "4px",
            pointerEvents: "auto",
            transition: "color 0.2s ease",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
