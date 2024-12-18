import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';  // Email and password icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseURI = import.meta.env.VITE_API_BASE_URI;

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURI}/users/login`, {
        email,
        password,
      });

      // Store JWT token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Set user data in Redux store
      dispatch(setUser({ user: response.data.user, token: response.data.token }));

      // Redirect to homepage or another page
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center my-auto">
      <div className="container p-8 max-w-sm bg-white shadow-lg rounded-lg w-full sm:w-auto">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#800020' }}>
          Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-sm">Email</label>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FaEnvelope color="#800020" />
            </div>
            <input
              type="email"
              id="email"
              className="w-full px-12 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#800020]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm">Password</label>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FaLock color="#800020" />
            </div>
            <input
              type="password"
              id="password"
              className="w-full px-12 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#800020]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#800020] text-white rounded mt-4 hover:bg-[#9B0034]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
