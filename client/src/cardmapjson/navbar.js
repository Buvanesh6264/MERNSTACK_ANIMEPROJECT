import React, { useState } from "react";
import "./css/navbar.css";
import {useNavigate } from "react-router-dom";
import imag from './images/logo.jpg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // function toggle(){
  //   setIsOpen(!isOpen)
  // }
  function toggleSidebar() {
    setIsOpen(!isOpen);
  }
  const navigate = useNavigate();
  function logout(){
          navigate("/");
  }
  return (
    <nav className="navbar">
      <div className="logo"><img src={imag} alt="logo"/>MYANIME</div>
      <label className="toggle-button" onClick={toggleSidebar}>
        ☰
      </label>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
          <ul className="sidebar-links">
            <li><a href="/home">HOME</a></li>
            <li><a href="/profile">PROFILE</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
            <li><a href="/animepage">ANIME</a></li>
            <li><button className="logout" onClick={logout}>Logout</button></li>
        </ul>
      </div>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li><a href="/home">HOME</a></li>
        <li><a href="/profile">PROFILE</a></li>
        <li><a href="/wishlist">Wishlist</a></li>
        <li><a href="/animepage">ANIME</a></li>
        <li><button className="logout" onClick={logout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
