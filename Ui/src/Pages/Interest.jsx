import React, { useEffect, useState } from "react";
import "../css/Interest.css";
import axios from "axios";
import { FaPrayingHands } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const App = () => {
  let navigate = useNavigate()

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interests, setInterests] = useState([]);
  const userId = localStorage.getItem("id");

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const payload = {
    user: userId,
    interest: selectedInterests,
  };

  console.log(payload);

  const fetchInterests = async () => {
    axios
      .get("http://localhost:3000/api/dPreference/")
      .then((res) => setInterests(res.data));
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

     await axios.post(
      "http://localhost:3000/api/preference/create",
      payload
    );

    navigate('/')
    
  };
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=majestic%20mountain%20landscape%20with%20snow-capped%20peaks%20and%20dramatic%20clouds%20in%20soft%20natural%20lighting%20creating%20a%20serene%20and%20inspiring%20atmosphere%20perfect%20for%20meditation%20and%20self-discovery&width=1440&height=1024&seq=11&orientation=landscape')`,
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <i className="fas fa-dharmachakra text-white text-2xl"></i>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">
            Choose Your Interests
          </h1>
          <p className="text-lg text-amber-600">
            Select topics that inspire your journey
          </p>
        </div>

        {/* Interest Grid */}
        <div className="grid grid-cols-5 gap-8 mb-12">
          {interests.map((a) => {
            const isSelected = selectedInterests.includes(a._id);
            return (
              <div key={a._id} className="flex flex-col items-center">
                <div
                  className={`relative w-20 h-20 rounded-full border-4 cursor-pointer transition-all duration-200 hover:scale-105 overflow-hidden ${
                    isSelected
                      ? "border-red-500 bg-red-50"
                      : "border-yellow-300 bg-yellow-50 hover:border-yellow-400"
                  }`}
                  onClick={() => toggleInterest(a._id)}
                >
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center z-10">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                  )}
                  <img
                    src={a.image}
                    alt={a.interests}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-sm font-medium text-amber-700 mt-3 text-center capitalize">
                  {a.interests}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selection Counter */}
        <div className="flex justify-center mb-8">
          <div className="bg-yellow-200 text-amber-800 px-6 py-1 rounded-full text-sm font-medium">
            {selectedInterests.length} interests selected
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-center mb-8">
          <button
            type="button"
            onClick={submit}
            className="w-full py-3 px-6 text-white font-semibold text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 !rounded-button whitespace-nowrap"
          >
            Next
          </button>
        </div>

         <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-4 text-amber-800 opacity-90 bg-white/30 backdrop-blur-sm py-2 px-6 rounded-full shadow-lg">
            <FaPrayingHands className="text-xl" />
            <span className="text-sm font-medium">
              Namaste • Welcome to the Roof of the World
            </span>
            <FaMountainSun className="text-xl" />
          </div>
        </div>
      </div>
      </div>

      
  );
};

export default App;
