import React from 'react';
import { FaCartPlus, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, onAddToFavorite }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={product.image || 'https://images.unsplash.com/photo-1581701663554-291c6c9e56d2?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
        alt={product.name}
        className="w-full h-48 sm:h-56 md:h-64 object-cover"
      />

      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-600">{product.name}</h3>

        {/* Product Description */}
        <p className="text-sm sm:text-base lg:text-lg text-gray-500 mt-2">{product.description}</p>

        {/* Product Price */}
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFD700] mt-2">${product.price}</p>

        {/* Button Section */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 mt-3">
          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product)}
            className="bg-[#800020] text-white hover:bg-[#B88A2A] hover:text-[#fff] flex items-center mb-2 sm:mb-0 px-4 py-2 rounded-md"
          >
            <FaCartPlus className="mr-2" /> Add
          </button>

          {/* Add to Favorite Button */}
          <button
            onClick={() => onAddToFavorite(product)}
            className="text-[#800020] hover:text-[#B88A2A] flex items-center px-4 py-2 rounded-md"
          >
            <FaHeart className="mr-2" /> Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
