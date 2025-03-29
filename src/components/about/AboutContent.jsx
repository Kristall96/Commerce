import React from "react";
import "./aboutConent.css";

function AboutContent() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About MugMarvel ☕</h1>
        <p>We craft mugs that make your mornings magical.</p>
      </section>

      <section className="about-story">
        <h2>Our Story</h2>
        <p>
          MugMarvel began with a simple idea: transform ordinary mugs into daily
          inspiration. Whether you're sipping on coffee, tea, or hot chocolate,
          we believe every cup deserves a little charm.
        </p>
      </section>

      <section className="about-values">
        <h2>What We Value</h2>
        <ul>
          <li>Unique, artistic designs</li>
          <li>Eco-conscious materials</li>
          <li>Handmade craftsmanship</li>
          <li>Gifting that makes people smile</li>
        </ul>
      </section>

      <section className="about-team">
        <h2>Meet Our Team</h2>
        <p>
          We're a small team of designers, dreamers, and coffee lovers who
          believe in bringing joy one mug at a time.
        </p>
      </section>
    </div>
  );
}

export default AboutContent;
