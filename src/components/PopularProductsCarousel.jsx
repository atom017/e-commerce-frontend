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
        const popular = response.data.products.filter((product) =>
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
    autoplay: true,  // Enable autoplay
    autoplaySpeed: 3000, // Set the autoplay speed (3 seconds)
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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Popular Products</h2>
      {popularProducts.length > 0 ? (
        <Slider {...settings}>
          {popularProducts.map((product) => (
            <div key={product._id} className="flex flex-col items-center bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg relative">
            {/* Product "Popular" Tag */}
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-full">
              Popular
            </div>
          
            {/* Product Image Container */}
            <div className="w-full h-28 sm:h-32 md:h-36 bg-gray-200 flex justify-center items-center overflow-hidden rounded-lg mb-4">
              <img
                src={product.image || '/default-product-image.jpg'} 
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>

            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-center text-gray-800 mb-2">{product.name}</h3>

            <p className="text-sm sm:text-lg md:text-xl font-semibold text-center text-gray-600">${product.price.toFixed(2)}</p>
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
