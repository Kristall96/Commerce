// components/blog/RandomBlogs.jsx
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../api/config";
import { Link } from "react-router-dom";
import "./randomBlogs.css";

const RandomBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blogs/random`);
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="random-blogs-section">
      <h2 className="gradient-text">From the Blog</h2>
      <div className="blog-card-grid">
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`} className="blog-card">
            <img src={blog.coverImage} alt={blog.title} />
            <h3>{blog.title}</h3>
            <p>{blog.content.slice(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RandomBlogs;
