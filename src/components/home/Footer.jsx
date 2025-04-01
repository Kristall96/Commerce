import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaCopyright,
} from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h2>MugMarvel</h2>
        <p>Your daily dose of mug magic </p>
      </div>

      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </div>

      <div className="footer-socials">
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer">
          <FaPinterest />
        </a>
      </div>

      <div className="footer-newsletter">
        <form>
          <input type="email" placeholder="Your email for updates" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} MugMarvel Store. All rights reserved.
        </p>
        <p>SoftUni - Project</p>
      </div>
    </footer>
  );
}

export default Footer;
