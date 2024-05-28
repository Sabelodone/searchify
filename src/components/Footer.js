import React from 'react';
import './Footer.css'; // Import the CSS file for the footer
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import social media icons from react-icons library

function Footer() {
    return (
        <footer>
            {/* Dotted line */}
            <div className="divider-line"></div>
            {/* Footer content goes here */}
            <div className="footer-content">
                <div className="contact-info">
                    <h4>Contact Us</h4>
                    <p>North Hills Lifestyle Estate, Germiston, South Africa</p>
                    <p>Phone: +72 76 412 376</p>
                    <p>Email: Searchify@gmail.com</p>
                </div>
                <div className="social-media">
                    <h4>Follow <span className="highlighted-text">Us</span></h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="icon" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="icon" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="icon" />
                        </a>
                    </div>
                </div>
            </div>
            <p>© 2024 My Searchify. All rights reserved.</p>
        </footer>
    );
}

export default Footer;

