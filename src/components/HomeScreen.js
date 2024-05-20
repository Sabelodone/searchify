import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Navigate to JobSearch page with the search query as a URL parameter
        navigate(`/job-search?query=${encodeURIComponent(searchQuery)}`);
    };

    const handleChange = (e) => {
        // Update searchQuery state as the user types
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container">
            <div className="welcome-text">
                <h1>Welcome to Searchify!</h1>
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
    );
};

export default HomeScreen;
