import React, { useState, useEffect } from "react";
import "./hero.css";

function Hero() {
  const images = [
    "/banner/banner1.png",
    "/banner/banner2.png",
    "/banner/banner3.png",
    "/banner/banner4.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-menu">
          <ul>
            {[
              "Shop by Design",
              "Culture & Themes",
              "Funny & Relatable",
              "Occasions & Holidays",
              "Gifts by Recipient",
            ].map((category, idx) => (
              <li key={idx} className="megaMenu">
                {category}
                <ul>
                  {["hello", "hello1", "hello2", "hello3", "hello4"].map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    )
                  )}
                </ul>
              </li>
            ))}
          </ul>
          <button className="shop-btn">Shop Now</button>
        </div>

        <div className="hero-carousel">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="carousel-image"
          />
          <button className="carousel-button prev" onClick={goToPrevious}>
            ❮
          </button>
          <button className="carousel-button next" onClick={goToNext}>
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
