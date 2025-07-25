import React, { useState } from "react";
import "../css/Register.css";
import axios from "axios";

import {
  FaUser,
  FaChevronDown,
  FaLock,
  FaPrayingHands,
  FaRegEye,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaMountainSun } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Register = () => {
  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    country: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3000/api/user/register",
      formData
    );
    const data = res.data;

    const { token, user } = data;
    const { name, country, role, _id } = user;

    // Store in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("country", country);
    localStorage.setItem("role", role);
    localStorage.setItem("id", _id);

    setFormData({
      email: "",
      password: "",
      name: "",
      country: "",
      role: "",
    });

    navigate('/interest')
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setFormStep(2);
  };

  const prevStep = () => {
    setFormStep(1);
  };

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic (Czechia)",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (Swaziland)",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  console.log(formData);
  return (
    <div className="min-h-screen relative overflow-hidden">
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
                    Join Our Community
                  </h1>
                  <p className="text-amber-700 text-sm">
                    Begin Your Himalayan Journey
                  </p>
                </div>
              </div>
              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div
                  className={`transition-all duration-500 transform ${
                    formStep === 1
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0 hidden"
                  }`}
                >
                  {/* Name Field */}
                  <div className="relative mb-6">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-amber-900 mb-2"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 text-sm bg-white border-2 border-amber-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                        placeholder="Enter your full name"
                        required
                      />
                      <FaUser className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-sm" />
                    </div>
                  </div>

                  {/* Country Field */}
                  <div className="relative mb-6">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-amber-900 mb-2"
                    >
                      Country
                    </label>
                    <div className="relative">
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange(e)}
                        className="w-full px-4 py-3 pl-12 text-sm bg-white border-2 border-amber-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 appearance-none cursor-pointer"
                        required
                      >
                        <option value="">Select your country</option>
                        {countries.map((a, i) => (
                          <option value={a} key={i}>
                            {a}
                          </option>
                        ))}
                      </select>
                      <BiWorld className="fas fa-globe-asia absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-sm" />
                      <FaChevronDown className="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-sm pointer-events-none" />
                    </div>
                  </div>

                  {/* next step */}
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full py-3 px-6 text-white font-semibold text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 !rounded-button whitespace-nowrap"
                  >
                    Next Step
                  </button>
                </div>

                <div
                  className={`transition-all duration-500 transform ${
                    formStep === 2
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-full opacity-0 hidden"
                  }`}
                >
                  {/* Email Field */}
                  <div className="relative mb-6">
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
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 text-sm bg-white border-2 border-amber-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                        placeholder="Enter your email"
                        required
                      />
                      <MdEmail className=" absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-sm" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="relative mb-6">
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
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pl-12 pr-12 text-sm bg-white border-2 border-amber-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                        placeholder="Create your password"
                        required
                      />
                      <FaLock className=" absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-sm" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-sm cursor-pointer hover:text-red-600 transition-colors"
                      >
                        {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-1/2 py-3 px-6 text-amber-900 font-semibold text-sm bg-amber-100 hover:bg-amber-200 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 !rounded-button whitespace-nowrap"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-3 px-6 text-white font-semibold text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 !rounded-button whitespace-nowrap"
                    >
                      Register
                    </button>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      formStep === 1 ? "bg-red-600 scale-125" : "bg-amber-300"
                    }`}
                  ></div>
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      formStep === 2 ? "bg-red-600 scale-125" : "bg-amber-300"
                    }`}
                  ></div>
                </div>

                {/* Sign In Link */}
                <div className="text-center mt-6">
                  <p className="text-sm text-amber-800">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="text-yellow-600 hover:text-red-600 font-medium transition-colors cursor-pointer"
                    >
                      Sign In Here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
          {/* Traditional Footer Pattern */}
          <div className="mt-8 text-center">
            <div className="flex justify-center items-center space-x-4 text-amber-800 opacity-90 bg-white/30 backdrop-blur-sm py-3 px-6 rounded-full shadow-lg">
              <FaPrayingHands className="fas fa-om text-xl" />
              <span className="text-sm font-medium">
                Namaste • Welcome to the Roof of the World
              </span>
              <FaMountainSun className="fas fa-mountain text-xl" />
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

export default Register;
