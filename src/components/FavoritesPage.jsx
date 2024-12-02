import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites, clearFavorites } from '../redux/favoritesSlice'; // Import favorite actions
import { FaTrashAlt } from 'react-icons/fa'; // Importing react-icons for better UI
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const { items } = useSelector((state) => state.favorites); // Get items from Redux favorites slice
  const user = useSelector((state) => state.user.user); // Get user from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate hook

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  const handleCancel = () => {
    navigate('/'); // Navigate to home page or any other page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Your Favorites</h2>

      {items.length === 0 ? (
        <p>Your favorites list is empty</p>
      ) : (
        <div>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4 sm:mb-0 w-full sm:w-auto">
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-gray-500">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-4 sm:mb-0 w-full sm:w-auto justify-between">
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromFavorites(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600"
                >
                  <FaTrashAlt />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between mt-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg mb-2 sm:mb-0 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleClearFavorites}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Clear All Favorites
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
