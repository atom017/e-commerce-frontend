import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice'; // Add your addToCart action
import 'react-toastify/dist/ReactToastify.css';

const FeaturedProductsCarousel = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading
    const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product for the modal
    const dispatch = useDispatch(); // Redux dispatch to add to cart
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
        speed: 300,
        slidesToShow: 4, // Show 4 items per slide on large screens
        slidesToScroll: 1,
        dots: true,
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
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Handle the product click to show the modal
    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    // Handle adding product to cart
    const handleAddToCart = (product) => {
        const { _id, name, price, image } = product;
        dispatch(addToCart({
            id: _id,
            name,
            price,
            quantity: 1,
            image,
        }));

        // Show a toast notification
        toast.success(`${name} has been added to your cart!`, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
        });

        // Close the modal after adding to the cart
        setSelectedProduct(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Featured Products</h2>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-500 border-solid"></div>
                </div>
            ) : (
                <Slider {...settings}>
                    {featuredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden p-2 transition-transform transform hover:scale-105"
                            onClick={() => handleProductClick(product)} // Show modal on product click
                        >
                            {/* Product "Featured" Tag */}
                            <div className="absolute top-4 left-4 bg-[#FFD700] text-white text-xs font-semibold py-1 px-3 rounded-full">
                                Featured
                            </div>

                            {/* Product Image */}
                            <div className="w-full h-28 sm:h-32 md:h-36 bg-gray-200 flex justify-center items-center overflow-hidden rounded-lg mb-4">
                                <img
                                    src={product.image || '/default-product-image.jpg'}
                                    alt={product.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Product Name */}
                            <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-2 text-center">{product.name}</h3>

                            {/* Product Price */}
                            <p className="text-sm md:text-lg font-semibold text-[#D4AF37] text-center">${product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </Slider>
            )}

            {/* Add to Cart Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-80 sm:w-96 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-auto relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-700 font-bold"
                            onClick={() => setSelectedProduct(null)} // Close the details modal
                        >
                            <FaTimes className="text-2xl" />
                        </button>

                        <h3 className="text-xl sm:text-2xl font-semibold mb-4">{selectedProduct.name}</h3>

                        {/* Image Container */}
                        <div className="w-full h-28 sm:h-32 md:h-36 bg-gray-200 flex justify-center items-center overflow-hidden rounded-lg mb-4">
                            <img
                                src={selectedProduct.image || '/default-product-image.jpg'}
                                alt={selectedProduct.name}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Product Price */}
                        <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">${selectedProduct.price.toFixed(2)}</p>

                        {/* Product Description */}
                        <p className="text-sm sm:text-base text-gray-600 mb-4">{selectedProduct.description}</p>

                        {/* Add to Cart Button */}
                        <button
                            onClick={() => handleAddToCart(selectedProduct)}
                            className="bg-[#800020] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg w-full hover:bg-[#9B2A37] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                        >
                            <FaShoppingCart className="mr-2" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default FeaturedProductsCarousel;
