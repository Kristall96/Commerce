// components/pages/Blog.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/config";
import "./BlogContent.css";

export const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blogs`);
        const data = await res.json();
        setBlogPosts(data);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-container">
      <h1 className="blog-title gradient-text">
        Our Blog{" "}
        <span role="img" aria-label="coffee">
          ☕
        </span>
      </h1>
      <p className="blog-subtitle">
        News, stories, and mugspiration from the MugMarvel world.
      </p>

      <div className="blog-list">
        {blogPosts.map((post) => (
          <div className="blog-card fancy" key={post._id}>
            <img
              src={post.image}
              alt={post.title}
              className="blog-card-image fancy-image"
            />
            <h2 className="fancy-title">
              <Link to={`/blog/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="blog-date">
              {new Date(post.createdAt).toDateString()}
            </p>
            <p className="fancy-excerpt">{post.content.slice(0, 140)}...</p>
            <Link to={`/blog/${post._id}`} className="read-more-btn">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
