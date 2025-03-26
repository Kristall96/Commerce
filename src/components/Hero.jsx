import React, { useState, useEffect } from "react";
import "./Hero.css";

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
      <div className="innerHero">
        <div className="innerBlock">
          <span className="heroSpan">
            <div className="heroText">
              <div>
                <ul>
                  <li className="megaMenu">
                    Shop by Design
                    <ul>
                      <li>hello</li>
                      <li>hello1</li>
                      <li>hello2</li>
                      <li>hello3</li>
                      <li>hello4</li>
                    </ul>
                  </li>
                  <li className="megaMenu">
                    Culture & Themes
                    <ul>
                      <li>hello</li>
                      <li>hello1</li>
                      <li>hello2</li>
                      <li>hello3</li>
                      <li>hello4</li>
                    </ul>
                  </li>
                  <li className="megaMenu">
                    Funny & Relatable
                    <ul>
                      <li>hello</li>
                      <li>hello1</li>
                      <li>hello2</li>
                      <li>hello3</li>
                      <li>hello4</li>
                    </ul>
                  </li>
                  <li className="megaMenu">
                    Occasions & Holidays
                    <ul>
                      <li>hello</li>
                      <li>hello1</li>
                      <li>hello2</li>
                      <li>hello3</li>
                      <li>hello4</li>
                    </ul>
                  </li>
                  <li className="megaMenu">
                    Gifts by Recipient
                    <ul>
                      <li>hello</li>
                      <li>hello1</li>
                      <li>hello2</li>
                      <li>hello3</li>
                      <li>hello4</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <button>Shpw Now</button>
              </div>
            </div>
          </span>
          <span className="heroSpan">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="carousel-image "
            />
            <button className="carousel-button prev" onClick={goToPrevious}>
              ❮
            </button>
            <button className="carousel-button next" onClick={goToNext}>
              ❯
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Hero;
