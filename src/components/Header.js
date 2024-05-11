import React from 'react';
import { FaHome, FaBell, FaBriefcase, FaUser } from 'react-icons/fa'; // Import icons from react-icons
import './Header.css'; // Import the CSS file for the header

function Header() {
    return (
        <header>
            <h1>Searchify</h1>
            <div className="button-group">
                <button><FaHome /></button>
                <button><FaBell /></button>
                <button><FaBriefcase /></button>
                <button><FaUser /></button> {/* Profile icon */}
            </div>
        </header>
    );
}

export default Header;


