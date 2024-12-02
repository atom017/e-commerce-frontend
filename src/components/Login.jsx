// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

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
        console.log(error)
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-sm">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm">Email</label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm">Password</label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded mt-4 hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
