// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';  // Import the Hero component
import PopularProductsCarousel from '../components/PopularProductsCarousel';  // Keep the PopularProductsCarousel
import FeaturedProductsCarousel from './FeaturedProductsCarousel';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section with Overlay Effect */}
      <Hero />
      <FeaturedProductsCarousel />
      <PopularProductsCarousel />

      <div className="text-center mt-8">
        <Link to="/products" className="text-blue-500 text-lg hover:underline">
          View All
        </Link>
      </div>

    </div>
  );
};

export default Home;
