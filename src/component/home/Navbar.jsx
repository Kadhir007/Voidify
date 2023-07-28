import React from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css";
const Navbar = () => {
  return (
    
      <nav className="navbar">
      <div className="navbar-container">
        <ul className="menu-items" >
          <li><Link to='/songs' className="purple">SONGS</Link></li>
          <li><Link to='/albums' className="skyblue">ALBUMS</Link></li>
          <li><Link to='/about' className="red">ABOUT</Link></li>
        </ul>
      </div>
    </nav>
   
  );
};

export default Navbar;
