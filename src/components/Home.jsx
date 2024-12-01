// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import PopularProductsCarousel from '../components/PopularProductsCarousel'; // Import the carousel component
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addToFavorites } from '../redux/favoritesSlice';
import { FaSearch } from 'react-icons/fa'; // Importing FontAwesome Search Icon

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const baseURI = import.meta.env.VITE_API_BASE_URI;

  // Fetch products and categories from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURI}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURI}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = async (product) => {
    const item = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    };
    dispatch(addToCart(item));
  };

  const handleAddToFavorites = (product) => {
    dispatch(addToFavorites(product));
  };

  // Filter products by search term and category
  const filteredProducts = products.filter((product) =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || product.category.name === selectedCategory)
  );

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

        {/* Search and Category Filters */}
        <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
          <div className="w-full sm:w-1/2 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products"
              className="w-full p-3 pl-10 border rounded-lg"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="w-full sm:w-1/4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToFavorite={handleAddToFavorites}
                setQuantity={setQuantity}
                quantity={quantity}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No products found.</p>
          )}
        </div>

        {/* Popular Products Carousel */}
        <PopularProductsCarousel />
      </div>
    </div>
  );
};

export default Home;
