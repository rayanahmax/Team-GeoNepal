import React, { useEffect, useState } from "react";
import { FaBars, FaMountain } from "react-icons/fa6";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userName = localStorage.getItem("name");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center"
              
              ><img src="./logo.png"></img>
              </div>
              <span className="text-xl font-bold text-gray-800">Yatra</span>
            </div>
            <span className="hidden md:block text-gray-600 text-lg ml-6">
              Hey {userName? userName : "There"}!
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-orange-600 font-medium cursor-pointer"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-orange-600 font-medium cursor-pointer"
            >
              Destinations
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-orange-600 font-medium cursor-pointer"
            >
              Tours
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-orange-600 font-medium cursor-pointer"
            >
              About
            </a>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  
                  localStorage.removeItem("token");
                  localStorage.removeItem("name");
                  localStorage.removeItem("id");
                  localStorage.removeItem("role");
                  localStorage.removeItem("country");
                  setIsLoggedIn(false);
                } else {
                  window.location.href = "/login";
                }
              }}
              className={`w-full px-6 py-2 !rounded-button font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                isLoggedIn
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-orange-600 focus:outline-none"
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-orange-600 font-medium"
              >
                Home
              </a>
              <a
                href="http://localhost:8080"
                className="block px-3 py-2 text-gray-700 hover:text-orange-600 font-medium"
              >
                Destinations
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-orange-600 font-medium"
              >
                Tours
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-orange-600 font-medium"
              >
                About
              </a>
              <div className="px-3 py-2">
                <button
                onClick={() => {
                if (isLoggedIn) {
                  localStorage.removeItem("token");
                  localStorage.removeItem("name");
                  localStorage.removeItem("id");
                  localStorage.removeItem("role");
                  localStorage.removeItem("country");
                  setIsLoggedIn(false);
                } else {
                  window.location.href = "/login";
                }
              }}
                  className={`w-full px-6 py-2 !rounded-button font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    isLoggedIn
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </button>
              </div>
              <div className="px-3 py-2">
                <span className="text-gray-600 text-lg">Hey {userName? userName : "There"}!</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
