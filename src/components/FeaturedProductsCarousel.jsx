import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const FeaturedProductsCarousel = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading
    const baseURI = import.meta.env.VITE_API_BASE_URI; // Base URI for API requests

    // Fetch featured products
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get(`${baseURI}/products/tags/featured`);
                setFeaturedProducts(response.data);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };
        fetchFeaturedProducts();
    }, [baseURI]);

    // Carousel settings for react-slick
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Show 4 items per slide on large screens
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        nextArrow: <FaArrowRight size={24} className="text-white" />,
        prevArrow: <FaArrowLeft size={24} className="text-white" />,
        responsive: [
            {
                breakpoint: 1280, // For larger tablets
                settings: {
                    slidesToShow: 3, // Show 3 items per slide
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // For smaller tablets and mobile
                settings: {
                    slidesToShow: 3, // Show 3 items per slide on small screens
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto py-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Featured Products</h2>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500 border-solid"></div>
                </div>
            ) : (
                <Slider {...settings}>
                    {featuredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden p-6 transition-transform transform hover:scale-105"
                        >
                            {/* Product "Featured" Tag */}
                            <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                                Featured
                            </div>

                            {/* Product Image Container */}
                            <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 bg-gray-200 flex justify-center items-center overflow-hidden rounded-lg mb-4">
                                <img
                                    src={product.image || '/default-product-image.jpg'}
                                    alt={product.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Product Name */}
                            <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">{product.name}</h3>

                            {/* Product Price */}
                            <p className="text-lg font-semibold text-teal-600 text-center">${product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default FeaturedProductsCarousel;
