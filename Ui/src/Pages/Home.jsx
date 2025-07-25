// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Featured from "../components/Featured";

const Home = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Header/>

      {/* Hero Section with Search */}
        <Hero/>

      {/* Featured Cards Section */}
      <Featured/>

      {/* Our Services Section */}
      <Services/>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Home;
