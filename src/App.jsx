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
      </Routes>
    </Router>
  );
}

export default App;
