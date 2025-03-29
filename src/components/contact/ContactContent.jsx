import React from "react";
import "./contactContent.css";

function Contact() {
  return (
    <div className="contact-container">
      <section className="contact-header">
        <h1>Get in Touch ☕</h1>
        <p>
          We’d love to hear from you! Whether it’s a question, feedback, or just
          a mug-related thought, shoot us a message.
        </p>
      </section>

      <div className="contact-content">
        {/* Contact Form */}
        <form className="contact-form">
          <label>
            Name
            <input type="text" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" placeholder="Your email" required />
          </label>
          <label>
            Message
            <textarea
              rows="5"
              placeholder="Your message..."
              required
            ></textarea>
          </label>
          <button type="submit">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <h3>Contact Info</h3>
          <p>
            <strong>Email:</strong> support@mugmarvel.store
          </p>
          <p>
            <strong>Phone:</strong> +1 (800) 123-4567
          </p>
          <p>
            <strong>Location:</strong> MugMarvel HQ, Coffee Lane, Mug City, USA
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
