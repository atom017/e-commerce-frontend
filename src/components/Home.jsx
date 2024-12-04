// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';  // Import the Hero component
import PopularProductsCarousel from '../components/PopularProductsCarousel';  // Keep the PopularProductsCarousel
import FeaturedProductsCarousel from './FeaturedProductsCarousel';

const Home = () => {
  return (
    <div>
      {/* Hero Section with Overlay Effect */}
      <Hero />
      <FeaturedProductsCarousel />
      <PopularProductsCarousel />

    </div>
  );
};

export default Home;
