// src/components/ProductCard.jsx
import React from 'react';
import { FaCartPlus, FaHeart } from 'react-icons/fa'; // Using React Icons

const ProductCard = ({ product, onAddToCart,onAddToFavorite}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Product Image */}
      <img
        src={product.image || 'https://images.unsplash.com/photo-1581701663554-291c6c9e56d2?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>

        {/* Product Description */}
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>

        {/* Product Price */}
        <p className="text-lg font-bold text-gray-900 mt-2">${product.price}</p>

        {/* Action Icons */}
        <div className="flex items-center space-x-4 mt-3">
          <button
            onClick={() => onAddToCart(product)}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <FaCartPlus className="mr-2" /> Add to Cart
          </button>
          <button onClick={() => onAddToFavorite(product)}
          className="text-red-600 hover:text-red-800 flex items-center">
            <FaHeart className="mr-2" /> Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
