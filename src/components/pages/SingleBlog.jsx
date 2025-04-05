// components/pages/SingleBlog.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../api/config";
import "./BlogContent.css";

export const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blogs/${id}`);
        const data = await res.json();
        if (res.ok) {
          setBlog(data);
        } else {
          throw new Error(data.message || "Failed to fetch blog");
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user || !token) return alert("Login to comment");

    try {
      const res = await fetch(`${BASE_URL}/api/blogs/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: comment }),
      });

      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, data]);
        setComment("");
      } else {
        alert(data.message || "Failed to comment");
      }
    } catch (err) {
      alert("Something went wrong", err);
    }
  };

  if (error) return <p className="blog-error">{error}</p>;
  if (!blog) return <p className="blog-error">Loading blog...</p>;

  return (
    <div className="blog-single-container">
      <h1 className="blog-single-title gradient-text">{blog.title}</h1>
      <p className="blog-date">{new Date(blog.createdAt).toDateString()}</p>
      <img
        src={blog.image}
        alt={blog.title}
        className="blog-single-image large"
      />
      <div className="blog-content rich-text">{blog.content}</div>

      <div className="comment-section">
        <h4>Leave a Comment</h4>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your thoughts..."
        />
        <button onClick={handleSubmit} className="submit-comment">
          Submit Comment
        </button>
      </div>

      {comments.length > 0 && (
        <div className="comments-wrapper">
          <h4>Comments</h4>
          {comments.map((c, idx) => (
            <div key={idx} className="review-box">
              <p className="review-user">{c.user?.username || "Anonymous"}</p>
              <p className="comment-text">{c.text}</p>
            </div>
          ))}
        </div>
      )}

      <Link to="/blog" className="back-to-blog">
        ← Back to Blog
      </Link>
    </div>
  );
};
