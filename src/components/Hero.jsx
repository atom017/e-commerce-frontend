// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative w-full h-96 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg")' }}>
            {/* Overlay effect */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-4xl font-bold">Welcome to TopShop</h1>
                <p className="mt-4 text-lg">Discover amazing products and exclusive deals.</p>
                {/* Button to View All Products */}
                <Link to="/products" className="mt-6 px-6 py-3 bg-[#E1B44C] text-white rounded-lg text-lg hover:bg-[#E6C67A] transition duration-300">
                    Shop Now
                </Link>
            </div>
        </div>
    );
};

export default Hero;
