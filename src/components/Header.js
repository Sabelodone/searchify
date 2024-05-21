import React, { useState } from 'react';
import { FaHome, FaBell, FaBriefcase, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const goToHome = () => {
        navigate('/');
    };

    const goToJobSearch = () => {
        navigate('/job-search');
    };

    return (
        <header>
            <h1>Searchify</h1>
            <div className="button-group">
                <button onClick={goToHome}><FaHome /></button>
                <button><FaBell /></button>
                {location.pathname !== '/job-search' && (
                    <button onClick={goToJobSearch}><FaBriefcase /></button>
                )}
                <div className="dropdown">
                    <button
                        className="dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        onClick={toggleDropdown}
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen ? "true" : "false"}
                    >
                        <FaUser />
                    </button>
                    <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                        <button id="profile" className="dropdown-item" type="button">Profile</button>
                        <button id="settings" className="dropdown-item" type="button">Settings</button>
                        <div className="dropdown-divider"></div>
                        <button id="logout" className="dropdown-item" type="button">Logout</button>
                        <button id="resume-cv-upload" className="dropdown-item" type="button">Resume/CV Upload</button>
                        <button id="saved-jobs" className="dropdown-item" type="button">Saved Jobs</button>
                        <button id="applied-jobs" className="dropdown-item" type="button">Applied Jobs</button>
                        <button id="recommended-jobs" className="dropdown-item" type="button">Recommended Jobs</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

