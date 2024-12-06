// ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { FaCartPlus, FaHeart } from 'react-icons/fa'; // React Icons

const ProductDetail = ({ products }) => {
  const { productId } = useParams();  // Get product ID from URL
  const product = products.find((p) => p._id === productId);

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = () => {
    // Logic for adding the product to the cart
    alert('Product added to cart');
  };

  const handleAddToFavorites = () => {
    // Logic for adding the product to favorites
    alert('Product added to favorites');
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 sm:w-3/5 md:w-2/5 mx-auto">
        <button 
          onClick={() => window.history.back()} 
          className="absolute top-4 left-4 bg-red-600 text-white p-2 rounded-full"
        >
          X
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h2>
          
          {/* Product Image */}
          <div className="w-full h-56 sm:h-64 md:h-72 bg-gray-200 flex justify-center items-center overflow-hidden rounded-lg mb-4">
            <img
              src={product.image || '/default-product-image.jpg'} 
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>

          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-semibold text-gray-800">${product.price.toFixed(2)}</p>
          
          <div className="mt-6 flex justify-between">
            <button 
              onClick={handleAddToCart} 
              className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2"
            >
              <FaCartPlus /> Add to Cart
            </button>
            <button 
              onClick={handleAddToFavorites} 
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg flex items-center gap-2"
            >
              <FaHeart /> Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
