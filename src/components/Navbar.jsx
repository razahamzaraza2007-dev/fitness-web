import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Brand / Logo */}
      <Link to="/dashboard" className="logo-container" onClick={closeMenu}>
        <h1 className="logo">
          CROSS<span style={{ color: '#00e5ff' }}>ARENA</span>
        </h1>
      </Link>

      {/* Mobile Hamburger Icon */}
      <button 
        className={`hamburger ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu} 
        aria-label="Toggle Navigation"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Nav Links Container */}
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
        <NavLink to="/workout-plan" onClick={closeMenu}>Workout</NavLink>
        <NavLink to="/diet-plan" onClick={closeMenu}>Diet</NavLink>
        <NavLink to="/habit-tracker" onClick={closeMenu}>Habits</NavLink>
        <NavLink to="/chatbot" onClick={closeMenu}>AI Coach</NavLink>

        <span className="nav-divider">|</span>

        <NavLink to="/admin" className="admin-badge" onClick={closeMenu}>
          Admin
        </NavLink>

        <button className="btn-neon" onClick={closeMenu}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}