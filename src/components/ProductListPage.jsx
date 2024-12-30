// src/pages/ProductListPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addToFavorites } from '../redux/favoritesSlice';
import { FaSearch } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true); // Loading state
    const dispatch = useDispatch();
    const baseURI = import.meta.env.VITE_API_BASE_URI;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Set loading to true when fetching starts
            try {
                const response = await axios.get(`${baseURI}/products`, {
                    params: {
                        page: currentPage,
                        limit: 8, // Number of products per page
                    },
                });
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        const fetchCategories = async () => {
            setLoading(true); // Set loading to true when fetching starts
            try {
                const response = await axios.get(`${baseURI}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchProducts();
        fetchCategories();
    }, [currentPage, baseURI]);

    // Handle Add to Cart
    const handleAddToCart = (product) => {
        const item = {
            id: product._id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image,
        };
        dispatch(addToCart(item));
        toast.success(`${product.name} has been added to your cart!`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            pauseOnHover: true,
        });
    };

    const handleAddToFavorites = (product) => {
        dispatch(addToFavorites(product));
        toast.success(`${product.name} has been added to your favorites!`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            pauseOnHover: true,
            style: { background: '#E8DFD0' },
        });
    };

    // Filter products by search term and category
    const filteredProducts = products.filter((product) =>
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === 'all' || product.category.name === selectedCategory)
    );

    // Pagination Functions
    const goToPage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto w-2/3 sm:w-full  p-3 ">
            {/* <h1 className="text-3xl font-bold text-center mb-8 w-full h-[200] bg-green-500">Products</h1> */}

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

            {/* Loading Indicator */}
            {loading ? (
                <div className="flex justify-center items-center space-x-2">
                    <div className="loader">Loading...</div> {/* You can use a spinner or custom loader here */}
                </div>
            ) : (
                <>
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
                </>
            )}

            <ToastContainer />
        </div>
    );
};

export default ProductListPage;
