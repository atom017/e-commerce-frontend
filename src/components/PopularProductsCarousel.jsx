import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; // Slick carousel component
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { addToCart } from '../redux/cartSlice'; // Import the addToCart action
import { FaTimes, FaShoppingCart } from 'react-icons/fa'; // Import icons from react-icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PopularProductsCarousel = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product
  const dispatch = useDispatch(); // Initialize the Redux dispatch function
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
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    const { _id, name, price, image } = product;
    dispatch(addToCart({
      id: _id,
      name,
      price,
      quantity: 1,
      image,
    }));
    toast.success(`${product.name} has been added to your cart!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      pauseOnHover: true,
    });
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Popular Products</h2>

      {loading ? (
        <div className="flex justify-center items-center h-56">
          <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-solid border-blue-600 rounded-full" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : popularProducts.length > 0 ? (
        <Slider {...settings}>
          {popularProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-lg relative cursor-pointer"
              onClick={() => handleProductClick(product)} // Add click handler
            >
              {/* Product "Popular" Tag */}
              <div className="absolute top-4 left-4 bg-[#FFD700] text-white text-xs font-semibold py-1 px-2 rounded-full">
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

      {
        selectedProduct && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 m-auto">
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-80 sm:w-96 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-auto relative">

              <button
                className="absolute top-4 right-4 text-gray-700 font-bold"
                onClick={() => setSelectedProduct(null)} // Close the details modal
              >
                <FaTimes className="text-2xl" />
              </button>

              <h3 className="text-xl sm:text-2xl font-semibold mb-4">{selectedProduct.name}</h3>


              <div className="w-full h-28 sm:h-32 md:h-36 bg-gray-200 flex justify-center items-center overflow-hidden rounded-lg mb-4">
                <img
                  src={selectedProduct.image || '/default-product-image.jpg'}
                  alt={selectedProduct.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">${selectedProduct.price.toFixed(2)}</p>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{selectedProduct.description}</p>


              <button
                onClick={() => handleAddToCart(selectedProduct)}
                className="bg-[#800020] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg w-full hover:bg-[#9B2A37] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        )
      }
      <ToastContainer />
    </div>
  );
};

export default PopularProductsCarousel;
