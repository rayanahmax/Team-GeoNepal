import React from 'react'
import Register from './Pages/Register'
import Login from './Pages/Login'

import { Routes, Route } from "react-router-dom";
import Interest from './Pages/Interest';
import Home from './Pages/Home';
import Search from './Pages/Search';
import GoogleReverseGeocode from './Ge';
import MapComponent from './Map/MapComponent';


const App = () => {
  return (
    <>

      {/* <MapComponent /> */}
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/interest" element={<Interest />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/g" element={<GoogleReverseGeocode />}/>
      </Routes>
    </>
  )
}

export default App