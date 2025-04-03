import React, { useState } from "react";

const StarRating = ({ rating = 0, onRate, interactive = false }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  const isActive = interactive && typeof onRate === "function";

  const handleClick = (value) => {
    if (!isActive) return;
    setSelected(value);
    onRate(value);
  };

  return (
    <div className="star-rating" style={{ fontSize: "1.2rem" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => isActive && setHovered(star)}
          onMouseLeave={() => isActive && setHovered(0)}
          style={{
            color:
              hovered >= star || (!hovered && (selected || rating) >= star)
                ? "#ffc107"
                : "#555",
            cursor: isActive ? "pointer" : "default",
            transition: "color 0.2s",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
