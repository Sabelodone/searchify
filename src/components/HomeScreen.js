import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        navigate(`/job-search?query=${encodeURIComponent(searchQuery)}`);
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container">
            <div className="overlay"></div>
            <div className="content">
                <div className="welcome-text">
                    <h4>Welcome to <span className="highlighted-text">Searchify</span></h4>
                    <p>Discover your dream job with ease. Let us guide you through a seamless search experience.</p>
                </div>
                <div className="search-container">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search for jobs..." 
                        value={searchQuery}
                        onChange={handleChange}
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearch} />
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
