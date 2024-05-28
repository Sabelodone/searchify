import React, { useState } from 'react';
import { FaHome, FaBell, FaBriefcase, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import Login from './Login';
import './Header.css';

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
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

    const openRegisterModal = () => {
        setRegisterModalOpen(true);
        setDropdownOpen(false);
    };

    const openLoginModal = () => {
        setLoginModalOpen(true);
        setDropdownOpen(false);
    };

    return (
        <header className="header">
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
                        <button 
                            id="Register" 
                            className="dropdown-item" 
                            type="button" 
                            onClick={openRegisterModal}
                        >
                            Register
                        </button>
                        <div className="dropdown-divider"></div>
                        <button 
                            id="LogIn" 
                            className="dropdown-item" 
                            type="button" 
                            onClick={openLoginModal}
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>

            <Register show={registerModalOpen} handleClose={() => setRegisterModalOpen(false)} />
            <Login show={loginModalOpen} handleClose={() => setLoginModalOpen(false)} />
        </header>
    );
}

export default Header;
