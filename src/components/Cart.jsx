import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const { items } = useSelector((state) => state.cart); // Get items from Redux
  const user = useSelector((state) => state.user.user); // Get user from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate hook
  const baseURI = import.meta.env.VITE_API_BASE_URI;

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleCheckout = async () => {
    if (!user || !user.id) {
      console.error('User is not logged in');
      return;
    }
  
    // Get cart data from the Redux store or state (assuming cart is stored in Redux)
    const cart = items;  // Assuming you store cart items in Redux
  
    // Make sure the cart is not empty
    if (cart.length === 0) {
      console.error('Cart is empty');
      return;
    }
  
    try {
      // Send userId and cart data to backend
      const response = await axios.post(
        `${baseURI}/payment/checkout`,
        { 
          userId: user.id,     
          cartItems: cart    // Send cart items to the backend
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      // Handle successful checkout
      if (response.data.url) {
        window.location.href = response.data.url;
        dispatch(clearCart());
      } else {
        console.log('Checkout failed: Missing URL in response');
      }
    } catch (error) {
      console.log('Error during checkout:', error);
    }
  };
  

  const handleCancel = () => {
    handleClearCart();
    navigate('/'); // Navigate to home page or any other page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
    
{items.length === 0 ? (
  <p>Your cart is empty</p>
) : (
  <div>
    {items.map((item, index) => (
      <div key={index} className="flex justify-between items-center mb-4">
        <div>
          <p>{item.name}</p>
          <p>${item.price}</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={() => handleRemoveFromCart(item.id)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Remove
        </button>
      </div>
    ))}
    <div className="flex justify-between mt-4">
      <button
        onClick={handleCancel}
        className="px-6 py-2 bg-gray-500 text-white rounded"
      >
        Cancel
      </button>
      <button
        onClick={handleCheckout}
        className="px-6 py-2 bg-green-500 text-white rounded"
      >
        Checkout
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Cart;
