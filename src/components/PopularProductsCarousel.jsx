// src/components/PopularProductsCarousel.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; // Slick carousel component

const PopularProductsCarousel = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const baseURI = import.meta.env.VITE_API_BASE_URI;

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get(`${baseURI}/products`);
        // Filter products based on the "POPULAR" tag
        const popular = response.data.filter((product) =>
          product.tags.includes("popular")
        );
        setPopularProducts(popular);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };

    fetchPopularProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Popular Products</h2>
      {popularProducts.length > 0 ? (
        <Slider {...settings}>
          {popularProducts.map((product) => (
            <div key={product._id} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
              {/* Product Image */}
              <div className="w-full h-56 bg-gray-200 flex justify-center items-center overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image || '/default-product-image.jpg'} // Use a default image if none exists
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Product Name */}
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">{product.name}</h3>
              {/* Product Price */}
              <p className="text-xl font-semibold text-center text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-600">No popular products found.</p>
      )}
    </div>
  );
};

export default PopularProductsCarousel;
