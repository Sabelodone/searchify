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
                    <p>South Hills Lifestle Estate, Johhanesburg, South Africa</p>
                    <p>Phone: +72 746 422 396</p>
                    <p>Email: Sabelozondo825@gmail.com</p>
                </div>
                <div className="social-media">
                    <h4>Follow <span className="highlighted-text">Us</span></h4>
                    <div className="social-icons">
                        <FaFacebook className="icon" />
                        <FaTwitter className="icon" />
                        <FaInstagram className="icon" />
                    </div>
                </div>
            </div>
            <p>© 2024 My Searchify. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
