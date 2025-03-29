import React from "react";
import "./BlogContent.css";

function BlogContent() {
  const blogPosts = [
    {
      title: "The Art of Mug Collecting",
      date: "March 20, 2025",
      excerpt:
        "From vintage to modern designs — explore the joys of collecting mugs with personality.",
    },
    {
      title: "5 Mug Care Tips You Didn't Know",
      date: "March 10, 2025",
      excerpt:
        "Make your mugs last longer and keep them looking brand new with these insider tips.",
    },
    {
      title: "Meet the Maker: MugMarvel’s Lead Designer",
      date: "February 25, 2025",
      excerpt:
        "We sat down with our lead designer to talk creativity, coffee, and crafting the perfect mug.",
    },
  ];

  return (
    <div className="blog-container">
      <h1 className="blog-title">Our Blog ☕</h1>
      <p className="blog-subtitle">
        News, stories, and mugspiration from the MugMarvel world.
      </p>

      <div className="blog-list">
        {blogPosts.map((post, index) => (
          <div className="blog-card" key={index}>
            <h2>{post.title}</h2>
            <p className="blog-date">{post.date}</p>
            <p>{post.excerpt}</p>
            <button className="read-more-btn">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogContent;
