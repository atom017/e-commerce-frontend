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
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm sm:text-base text-gray-600 mt-2">{product.description}</p>
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-2">${product.price}</p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mt-3">
          <button
            onClick={() => onAddToCart(product)}
            className="text-blue-600 hover:text-blue-800 flex items-center mb-2 sm:mb-0"
          >
            <FaCartPlus className="mr-2" /> Add to Cart
          </button>
          <button
            onClick={() => onAddToFavorite(product)}
            className="text-red-600 hover:text-red-800 flex items-center"
          >
            <FaHeart className="mr-2" /> Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
