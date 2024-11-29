import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Import ProductCard
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice'; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantity, setQuantity] = useState(1); // State to manage quantity input
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Assuming user data is stored in Redux
  const baseURI = import.meta.env.VITE_API_BASE_URI;

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURI}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle Add to Cart (call backend to update/create cart, then update Redux)
  // Home.js
const handleAddToCart = async (product) => {
  const item = {
    id: product._id,
    name: product.name,
    price: product.price,
    quantity: quantity, // Use the current quantity state
  };

  // Dispatch the addToCart action to update Redux store
  dispatch(addToCart(item));

};

  


  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name or category"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id} // Assuming product has a unique '_id' field
                product={product}
                onAddToCart={handleAddToCart} // Pass handleAddToCart function to ProductCard
                setQuantity={setQuantity} // Pass setQuantity function to ProductCard to handle quantity change
                quantity={quantity} // Pass current quantity to ProductCard
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
