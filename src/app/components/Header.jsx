'use client';
import React, { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import styles from './Header.module.css';

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
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.main_nav}>
          {/* Mobile menu button - only shows on mobile */}
          {isMobile && (
            <button className={styles.menuToggle} onClick={toggleMenu}>
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}

          <h1 className={styles.brand}>KB</h1>
          <h1 className={styles.logo}>LOGO</h1>
          
          <div className={styles.icons}>
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
            <div className={styles.languageSelector}>
              <span>ENG</span>
              <FiChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Desktop Navigation - always visible on desktop, hidden on mobile */}
        {!isMobile && (
          <div className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}><a href="#">SHOP</a></li>
              <li className={styles.navItem}><a href="#">SKILLS</a></li>
              <li className={styles.navItem}><a href="#">STORIES</a></li>
              <li className={styles.navItem}><a href="#">ABOUT</a></li>
              <li className={styles.navItem}><a href="#">CONTACT US</a></li>
            </ul>
          </div>
        )}

        {/* Mobile Navigation - only shows when menu is open on mobile */}
        {isMobile && (
          <>
            <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
              <ul className={styles.mobileNavList}>
                <li className={styles.mobileNavItem}><a href="#">SHOP</a></li>
                <li className={styles.mobileNavItem}><a href="#">SKILLS</a></li>
                <li className={styles.mobileNavItem}><a href="#">STORIES</a></li>
                <li className={styles.mobileNavItem}><a href="#">ABOUT</a></li>
                <li className={styles.mobileNavItem}><a href="#">CONTACT US</a></li>
              </ul>
            </div>
            {isMenuOpen && (
              <div className={styles.mobileNavOverlay} onClick={toggleMenu}></div>
            )}
          </>
        )}
      </div>

      <div className={styles.headerContent}>
        <hr className={styles.hr}/>
        <h1>DISCOVER OUR PRODUCTS</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br /> Sint molestias exercitationem dignissimos dolores, explicabo pariatur fugiat.</p>
        <hr className={styles.hr} />
      </div>
    </div>
  );
};

export default Header;