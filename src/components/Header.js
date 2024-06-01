import React, { useState, useEffect } from 'react';
import { FaHome, FaBell, FaBriefcase, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Register';
import Login from './Login';
import './Header.css';

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/current-user', {
                    withCredentials: true
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchUser();
    }, []);

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

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/api/logout', { withCredentials: true });
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <header className="header">
            <h1>Searchify</h1>
            <div className="button-group">
                <button onClick={goToHome}><FaHome /></button>
                <button><FaBell /></button>
                {user && location.pathname !== '/job-search' && (
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
                        {user ? (
                            <>
                                <div className="dropdown-item">Welcome, {user.username}</div>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" onClick={() => navigate('/upload-resume')}>Upload Resume</button>
                                <button className="dropdown-item" onClick={() => navigate('/applied-jobs')}>Applied Jobs</button>
                                <button className="dropdown-item" onClick={() => navigate('/settings')}>Settings</button>
                                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <button className="dropdown-item" onClick={openRegisterModal}>Register</button>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" onClick={openLoginModal}>Log In</button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Register show={registerModalOpen} handleClose={() => setRegisterModalOpen(false)} />
            <Login show={loginModalOpen} handleClose={() => setLoginModalOpen(false)} />
        </header>
    );
}

export default Header;
