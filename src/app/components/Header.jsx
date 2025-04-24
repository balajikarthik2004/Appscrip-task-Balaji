'use client';
import React, { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import './header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial render
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="main_nav">
          {/* Mobile menu button - only shows on mobile */}
          {isMobile && (
            <button className="menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}

          <h1 className="brand">KB</h1>
          <h1 className="logo">LOGO</h1>
          
          <div className="icons">
            <a href="#" aria-label="Search">
              <FiSearch size={20} />
            </a>
            <a href="#" aria-label="Wishlist">
              <FiHeart size={20} />
            </a>
            <a href="#" aria-label="Cart">
              <FiShoppingCart size={20} />
            </a>
            <a href="#" aria-label="Account">
              <FiUser size={20} />
            </a>
            <div className="language-selector">
              <span>ENG</span>
              <FiChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Desktop Navigation - always visible on desktop, hidden on mobile */}
        {!isMobile && (
          <div className="nav">
            <ul>
              <li><a href="#">SHOP</a></li>
              <li><a href="#">SKILLS</a></li>
              <li><a href="#">STORIES</a></li>
              <li><a href="#">ABOUT</a></li>
              <li><a href="#">CONTACT US</a></li>
            </ul>
          </div>
        )}

        {/* Mobile Navigation - only shows when menu is open on mobile */}
        {isMobile && (
          <>
            <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
              <ul>
                <li><a href="#">SHOP</a></li>
                <li><a href="#">SKILLS</a></li>
                <li><a href="#">STORIES</a></li>
                <li><a href="#">ABOUT</a></li>
                <li><a href="#">CONTACT US</a></li>
              </ul>
            </div>
            {isMenuOpen && (
              <div className="mobile-nav-overlay" onClick={toggleMenu}></div>
            )}
          </>
        )}
      </div>

      <div className="header-content">
        <hr className='hr'/>
        <h1>DISCOVER OUR PRODUCTS</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br /> Sint molestias exercitationem dignissimos dolores, explicabo pariatur fugiat.</p>
        <hr className='hr' />
      </div>
    </div>
  );
};

export default Header;