import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './HomeScreen.css';

const HomeScreen = () => {
    return (
        <div className="container">
            <div className="welcome-text">
                <h1>Welcome to Searchify!</h1>
                <p>Discover your dream job with ease. Let us guide you through a seamless search experience.</p>
            </div>
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search for jobs..." />
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
        </div>
    );
};

export default HomeScreen;
