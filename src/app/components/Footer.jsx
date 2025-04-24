import React from 'react';
import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.newsletter}>
          <h3>Be the first to know</h3>
          <p>Sign up for updates from mettā muse.</p>         
          <div className={styles.emailSignup}>
            <input  type="email" placeholder="Enter your e-mail..." />
            <button>Subscribe</button>
          </div>
        </div>

        <div className={styles.currencySelector}>
        <p>CONTACT US</p>
          <label>Currency</label>
          <div className={styles.contactInfo}>
            <p>+44 221 133 5360</p>
            <p>customercare@mettamuse.com</p>
          </div>
          <select defaultValue="USD">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <p className={styles.currencyNote}>
            Transactions will be completed in Euros and a currency reference is available on hover.
          </p>
        </div>
      </div>

      <div className={styles.footerMain}>
        <div className={styles.footerColumn}>
          <h4>mettā muse</h4>
          <ul>
            <li>About Us</li>
            <li>Stories</li>
            <li>Artisans</li>
            <li>Boutiques</li>
            <li>Contact Us</li>
            <li>EU Compliances Docs</li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4>Quick Links</h4>
          <ul>
            <li>Orders & Shipping</li>
            <li>Join/Login as a Seller</li>
            <li>Payment & Pricing</li>
            <li>Return & Refunds</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaPinterest /></a>
          </div>
          <h4 className={styles.paymentHeading}>mettā muse Accepts</h4>
          <div className={styles.paymentMethods}>
            {/* Add payment method icons here */}
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerLinks}>
          <a href="#">Join as a Seller</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Copyright © 2023 mettamuse. All rights reserved.</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;