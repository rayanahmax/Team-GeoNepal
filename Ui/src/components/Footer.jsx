import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram, FaTwitter, FaYoutube  } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-mountain text-white text-lg"></i>
                </div>
                <span className="text-2xl font-bold">Nepal Trek</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Your trusted partner for unforgettable adventures in the heart
                of the Himalayas. Discover Nepal's natural beauty and rich
                cultural heritage with our expert guides.
              </p>
              <div className="flex space-x-4">
                <FaFacebook  className="text-2xl text-gray-400 hover:text-white cursor-pointer"/>
                <FaInstagram className="text-2xl text-gray-400 hover:text-white cursor-pointer"/>
                <FaTwitter  className="fab fa-twitter text-2xl text-gray-400 hover:text-white cursor-pointer"/>
                <FaYoutube  className="text-2xl text-gray-400 hover:text-white cursor-pointer"/>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Destinations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Tour Packages
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-map-marker-alt text-orange-500"></i>
                  <span className="text-gray-300 text-sm">
                    Thamel, Kathmandu, Nepal
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-phone text-orange-500"></i>
                  <span className="text-gray-300 text-sm">+977 1 234 5678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-envelope text-orange-500"></i>
                  <span className="text-gray-300 text-sm">
                    info@nepaltrek.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Yatra. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <i className="fab fa-cc-visa text-2xl text-gray-400"></i>
                <i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
                <i className="fab fa-paypal text-2xl text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer