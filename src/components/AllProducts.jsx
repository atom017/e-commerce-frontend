import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { FaSearch } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Importing arrow icons for pagination
import { useLocation, useNavigate } from 'react-router-dom'; // For query parameters
import { ToastContainer, toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // To track totalPages
  const [totalCount, setTotalCount] = useState(0); // To track total number of products
  const [loading, setLoading] = useState(false); // Loading state for fetching products
  const baseURI = import.meta.env.VITE_API_BASE_URI;
  const location = useLocation();
  const navigate = useNavigate();

  const productsPerPage = 8;

  // Fetch products and categories
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true when fetching data
      const params = new URLSearchParams(location.search);
      const category = params.get('category') || 'all';
      const page = parseInt(params.get('page')) || 1;
      const search = params.get('search') || '';
      
      try {
        // If category is 'all', do not send it in the request, or send it as null
        const categoryParam = category === 'all' ? null : category;

        const response = await axios.get(`${baseURI}/products`, {
          params: {
            page: page,
            limit: productsPerPage,
            category: categoryParam,
            search: search,
          },
        });

        // Set products, total count, and total pages
        setProducts(response.data.products);
        setTotalCount(response.data.totalProducts);
        setTotalPages(response.data.totalPages); // Get totalPages from backend
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
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

    fetchCategories();
    fetchProducts();
  }, [location.search, currentPage, baseURI]);

  // Pagination function
  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      navigate({
        pathname: '/allproducts',
        search: `?page=${page}&limit=${productsPerPage}&category=${selectedCategory}&search=${searchTerm}`,
      });
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    navigate({
      pathname: '/allproducts',
      search: `?search=${e.target.value}&category=${selectedCategory}`,
    });
  };

  // Handle category selection change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    navigate({
      pathname: '/allproducts',
      search: `?category=${e.target.value}&search=${searchTerm}`,
    });
  };

  // Notify when an item is added to the cart
  const handleAddToCart = (product) => {
    // Your logic for adding to cart (could be dispatching a Redux action)
    toast.success(`${product.name} added to cart!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  // Notify when an item is added to the favorites
  const handleAddToFavorites = (product) => {
    // Your logic for adding to favorites (could be dispatching a Redux action)
    toast.success(`${product.name} added to favorites!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>

        {/* Search and Category Filters */}
        <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
          <div className="w-full sm:w-1/2 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products"
              className="w-full p-3 pl-10 border rounded-lg"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="w-full sm:w-1/4">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
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

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center my-8">
            <div className="spinner-border animate-spin border-4 border-blue-500 rounded-full w-8 h-8"></div>
            <p className="ml-4">Loading products...</p>
          </div>
        ) : (
          // Product List
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.length > 0 ? (
    products.map((product) => (
      <ProductCard 
        key={product._id} 
        product={product} 
        onAddToCart={handleAddToCart} // Pass the handleAddToCart function as a prop
        onAddToFavorites={handleAddToFavorites} // You can do the same for favorites
      />
    ))
  ) : (
    <p className="text-center text-gray-600">No products found.</p>
  )}
</div>

        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 mx-2 text-gray-600 disabled:text-gray-400 cursor-pointer"
          >
            <FaArrowLeft size={20} />
          </button>

          <span className="text-lg font-semibold text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 mx-2 text-gray-600 disabled:text-gray-400 cursor-pointer"
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* ToastContainer to show notifications */}
      <ToastContainer />
    </div>
  );
};

export default AllProducts;
