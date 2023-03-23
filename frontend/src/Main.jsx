import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/pages/Dashboard'
import About from './Components/pages/About';
import Product from './Components/pages/Product';


const main = () => {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/products" element={<Product />}/>
        </Routes>
    </>
  )
}

export default main