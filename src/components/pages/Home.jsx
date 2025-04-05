import React from "react";
import Hero from "../home/Hero";
import BestSellers from "../home/BestSellers";
import MostLiked from "../home/MostLiked";
import NewArrivals from "../home/NewArrivals";
import LimitedEdition from "../home/LimitedEdition";
import BlogPostMainPage from "../home/BlogPostMainPage";
function Home() {
  return (
    <>
      <Hero />
      <BestSellers />
      <MostLiked />
      <NewArrivals />
      <LimitedEdition />
      <BlogPostMainPage />
    </>
  );
}

export default Home;
