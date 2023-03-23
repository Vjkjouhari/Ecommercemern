import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">Navbar</NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                </li>            
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/products">Product</NavLink>
                </li>
            </ul>
        </div>
        </nav>
    </>
  )
}

export default Navbar