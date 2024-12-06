import React, { useState } from 'react';
import Slider from 'react-slick'; // Slick carousel component
import ProductDetail from './ProductDetail'; // Import the new ProductDetail component

const ProductsCarousel = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,  // Enable autoplay
    autoplaySpeed: 3000, // Set the autoplay speed (3 seconds)
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-4 mt-10">
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onClose={handleCloseDetail} />
      ) : (
        <Slider {...settings}>
          {products.map((product) => (
            <div 
              key={product._id} 
              className="flex flex-col items-center bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg relative cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              {/* Product "Popular" Tag */}
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-full">
                {product.tags.join(', ')}
              </div>
            
              {/* Product Image Container */}
              <div className="w-full h-28 sm:h-32 md:h-36 bg-gray-200 flex justify-center items-center overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image || '/default-product-image.jpg'} 
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-center text-gray-800 mb-2">{product.name}</h3>

              <p className="text-sm sm:text-lg md:text-xl font-semibold text-center text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductsCarousel;
