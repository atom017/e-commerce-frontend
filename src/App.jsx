// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import ProfileEdit from './components/ProfileEdit';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';
import FavoritesPage from './components/FavoritesPage';
import Footer from './components/Footer';
import ProductListPage from './components/ProductListPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/success" element={<CancelPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/products" element={<ProductListPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
