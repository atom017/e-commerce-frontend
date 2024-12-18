import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'; // Icons for social media and contact

const Footer = () => {
  return (
    <footer className="bg-[#800020] text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Column 1: About Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">
              We are a leading e-commerce platform providing high-quality products
              at affordable prices. Shop with us for the best deals on a wide range
              of items.
            </p>
          </div>

          {/* Column 2: Links */}
          {/* <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-300 text-sm">Home</a></li>
              <li><a href="/shop" className="hover:text-gray-300 text-sm">Shop</a></li>
              <li><a href="/about" className="hover:text-gray-300 text-sm">About Us</a></li>
              <li><a href="/contact" className="hover:text-gray-300 text-sm">Contact Us</a></li>
              <li><a href="/terms" className="hover:text-gray-300 text-sm">Terms & Conditions</a></li>
            </ul>
          </div> */}

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <span className="text-sm">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span className="text-sm">support@eshop.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 E-Shop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
