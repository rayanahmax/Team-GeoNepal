import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaEyeSlash, FaRegEye, FaLock, FaPrayingHands } from "react-icons/fa";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        payload
      );

      const data = res.data;

      const { user, token } = data;
      const { name, country, role, id } = user;

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("country", country);
      localStorage.setItem("role", role);
      localStorage.setItem("id", id);

      navigate('/')
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mih-screen relative overflow-hidden">
      {/* Animated Himalayan Mountain Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-90 animate-subtle-float"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=realistic%20majestic%20himalayan%20mountain%20range%20with%20dramatic%20clouds%20and%20mist%20floating%20between%20peaks%2C%20snow%20capped%20mountains%2C%20golden%20hour%20sunlight%20casting%20warm%20glow%2C%20high%20resolution%20landscape%20photography%20with%20rich%20details%20and%20atmospheric%20depth&width=1440&height=1024&seq=bg001&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.4)]"></div>
      </div>
      <div className="absolute inset-0 bg-[rgba(255,245,225,0.2)] backdrop-blur-[2px]"></div>
      {/* Decorative Prayer Flags */}
      <div className="absolute top-0 left-0 w-full h-16 opacity-30">
        <div className="flex space-x-2 pt-4 pl-8">
          <div className="w-8 h-6 bg-red-500 transform rotate-12"></div>
          <div className="w-8 h-6 bg-yellow-500 transform -rotate-6"></div>
          <div className="w-8 h-6 bg-blue-500 transform rotate-3"></div>
          <div className="w-8 h-6 bg-green-500 transform -rotate-12"></div>
          <div className="w-8 h-6 bg-white transform rotate-6"></div>
        </div>
      </div>
      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Traditional Wooden Frame Container */}
          <div className="relative bg-white/90 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm border border-amber-100/50 animate-form-appear">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 to-orange-50/80"></div>
            <div className="relative p-8">
              {/* Header with Mandala Design */}
              <div className="text-center mb-8">
                <div className="inline-block relative">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div
                      className="w-full h-full bg-cover bg-center rounded-full"
                      style={{
                        backgroundImage: `url('https://readdy.ai/api/search-image?query=traditional%20nepali%20mandala%20design%20with%20intricate%20geometric%20patterns%20in%20gold%20and%20red%20colors%20sacred%20buddhist%20symbol%20with%20detailed%20ornamental%20elements%20circular%20mandala%20with%20lotus%20petals%20and%20spiritual%20motifs&width=64&height=64&seq=mandala001&orientation=squarish')`,
                      }}
                    />
                  </div>
                  <h1
                    className="text-3xl font-bold text-amber-900 mb-2"
                    style={{ fontFamily: "serif" }}
                  >
                    Welcome to Nepal
                  </h1>
                  <p className="text-amber-700 text-sm">
                    Experience the Heart of the Himalayas
                  </p>
                </div>
              </div>
              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-amber-900 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 pl-12 text-sm bg-white border-2 border-amber-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                      placeholder="Enter your email"
                      required
                    />
                    <MdEmail className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-sm" />
                  </div>
                </div>
                {/* Password Field */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-amber-900 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pl-12 pr-12 text-sm bg-white border-2 border-amber-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                      placeholder="Enter your password"
                      required
                    />
                    <FaLock className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-sm" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-sm cursor-pointer hover:text-red-600 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                </div>
                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 border-2 border-amber-400 rounded mr-2 flex items-center justify-center ${
                        rememberMe ? "bg-red-600 border-red-600" : "bg-white"
                      } transition-all duration-200`}
                    >
                      {rememberMe && (
                        <i className="fas fa-check text-white text-xs"></i>
                      )}
                    </div>
                    <span className="text-sm text-amber-800">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-yellow-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </a>
                </div>
                {/* Decorative Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                  <div className="px-3">
                    <i className="fas fa-mountain text-amber-600 text-sm"></i>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                </div>
                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white font-semibold text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                  style={{
                    backgroundImage: "linear-gradient(45deg, #DC143C, #B22222)",
                    boxShadow: "0 4px 15px rgba(220, 20, 60, 0.3)",
                  }}
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Sign In to Nepal Tourism
                </button>
                {/* Sign Up Link */}
                <div className="text-center mt-6">
                  <p className="text-sm text-amber-800">
                    New to Nepal Tourism?{" "}
                    <a
                      href="#"
                      className="text-yellow-600 hover:text-red-600 font-medium transition-colors cursor-pointer"
                    >
                      Create an Account
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
          {/* Traditional Footer Pattern */}
          <div className="mt-8 text-center">
            <div className="flex justify-center items-center space-x-4 text-amber-800 opacity-90 bg-white/30 backdrop-blur-sm py-3 px-6 rounded-full shadow-lg">
              <FaPrayingHands className="text-2xl" />
              <span className="text-sm font-medium">
                Namaste • Welcome to the Roof of the World
              </span>
              <i className="fas fa-mountain text-xl"></i>
            </div>
          </div>
        </div>
      </div>
      {/* Traditional Corner Decorations */}
      <div className="absolute bottom-4 right-4 opacity-20">
        <div
          className="w-16 h-16 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=traditional%20nepali%20wood%20carving%20pattern%20with%20intricate%20floral%20motifs%20and%20geometric%20designs%20ornate%20decorative%20corner%20element%20in%20brown%20wood%20texture%20with%20detailed%20craftsmanship&width=64&height=64&seq=corner001&orientation=squarish')`,
          }}
        />
      </div>
      <div className="absolute top-4 right-4 opacity-20">
        <div
          className="w-16 h-16 bg-cover bg-center transform rotate-90"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=traditional%20nepali%20wood%20carving%20pattern%20with%20intricate%20floral%20motifs%20and%20geometric%20designs%20ornate%20decorative%20corner%20element%20in%20brown%20wood%20texture%20with%20detailed%20craftsmanship&width=64&height=64&seq=corner002&orientation=squarish')`,
          }}
        />
      </div>
    </div>
  );
};

// // Add these animations to your styles
// const style = document.createElement("style");
// style.textContent = `

// `;
// document.head.appendChild(style);
export default Login;
