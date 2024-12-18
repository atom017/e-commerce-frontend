import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBars, FaTimes, FaHome, FaShoppingCart, FaRegUser, FaSignOutAlt, FaHeart } from 'react-icons/fa'; // Icons
import { logout, setUser } from '../redux/userSlice'; // Redux actions
import { fetchUserFromLocalStorage } from '../utils/auth'; // Fetch user from localStorage

const Navbar = () => {
  const user = useSelector((state) => state.user.user); // Get user data from Redux
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux
  const favoriteItems = useSelector((state) => state.favorites.items); // Get favorite items from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuIcon, setIsMenuIcon] = useState(true); // Default to Bars (hamburger icon)

  // Check if the user is logged in from localStorage on initial load
  useEffect(() => {
    const userFromLocalStorage = fetchUserFromLocalStorage(); // Check if there's a user in localStorage
    if (userFromLocalStorage) {
      dispatch(setUser(userFromLocalStorage)); // Set user in Redux state
    }
  }, [dispatch]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMenuIcon(!isMenuIcon);
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/'); // Redirect to home page after logout
  };

  // Calculate total number of items in the cart (sum of quantities)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate total number of favorite items
  const totalFavorites = favoriteItems.length;

  // Close the mobile menu after clicking a nav item and reset the icon
  const closeMenuAndNavigate = (path) => {
    setIsMenuOpen(false); // Close the mobile menu
    setIsMenuIcon(true); // Reset to the hamburger icon
    navigate(path); // Navigate to the desired path
  };

  return (
    <nav className="bg-[#800020] p-4 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="w-full mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          TopShop
        </Link>

        {/* Navigation Links (Desktop and Tablet) */}
        <div className={`hidden lg:flex lg:space-x-4`}>
          <Link to="/" className="text-white hover:text-gray-200 flex items-center">
            <FaHome className="mr-1" />
            Home
          </Link>
          <Link to="/cart" className="text-white hover:text-gray-200 flex items-center">
            <FaShoppingCart className="mr-1" />
            Cart ({totalItems}) {/* Display total items */}
          </Link>
          <Link to="/favorites" className="text-white hover:text-gray-200 flex items-center">
            <FaHeart className="mr-1" />
            Favorites ({totalFavorites}) {/* Display total favorite items */}
          </Link>

          {/* Conditional Render: Show login/register if not logged in, else show user profile and logout */}
          {!user ? (
            <>
              <Link to="/login" className="text-white hover:text-gray-200 flex items-center">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-200 flex items-center">
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="text-white flex items-center">
                <Link to="/profile/edit" className="ml-4 text-white hover:text-gray-200 flex items-center">
                  <FaRegUser className="mr-1" />
                  {user.name || user.email}
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200 flex items-center ml-4"
              >
                <FaSignOutAlt className="mr-1" />
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger Menu Icon (for small screens) */}
        <button
          className="text-white lg:hidden"
          onClick={toggleMenu}
        >
          {isMenuIcon ? (
            <FaBars className="w-8 h-8" />
          ) : (
            <FaTimes className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Mobile Menu (for small screens) */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-[#800020] p-4`}>
        <Link
          to="/"
          className="block text-white hover:text-gray-200 py-2 flex items-center"
          onClick={() => closeMenuAndNavigate('/')}
        >
          <FaHome className="mr-1" />
          Home
        </Link>
        <Link
          to="/cart"
          className="block text-white hover:text-gray-200 py-2 flex items-center"
          onClick={() => closeMenuAndNavigate('/cart')}
        >
          <FaShoppingCart className="mr-1" />
          Cart ({totalItems}) {/* Display total items */}
        </Link>
        <Link
          to="/favorites"
          className="block text-white hover:text-gray-200 py-2 flex items-center"
          onClick={() => closeMenuAndNavigate('/favorites')}
        >
          <FaHeart className="mr-1" />
          Favorites ({totalFavorites}) {/* Display total favorite items */}
        </Link>

        {!user ? (
          <>
            <Link
              to="/login"
              className="block text-white hover:text-gray-200 py-2 flex items-center"
              onClick={() => closeMenuAndNavigate('/login')}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block text-white hover:text-gray-200 py-2 flex items-center"
              onClick={() => closeMenuAndNavigate('/register')}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile/edit"
              className="block text-white hover:text-gray-200 py-2 flex items-center"
              onClick={() => closeMenuAndNavigate('/profile/edit')}
            >
              <FaRegUser className="mr-1" />
              {user.name || user.email}
            </Link>
            <button
              onClick={handleLogout}
              className="block text-white hover:text-gray-200 py-2 flex items-center"
            >
              <FaSignOutAlt className="mr-1" />
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
