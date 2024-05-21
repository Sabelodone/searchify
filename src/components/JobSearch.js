// JobSearch.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './JobSearch.css';

const appId = process.env.REACT_APP_ADZUNA_APP_ID;
const appKey = process.env.REACT_APP_ADZUNA_APP_KEY;

const JobSearch = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${encodeURIComponent(searchQuery)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setJobs(data.results); // Assuming the API returns jobs in `data.results`
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchJobs();
        }
    }, [searchQuery]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="job-search-container">
            <div className="overlay"></div>
            <div className="content">
                <h2>Job Search Results for "{searchQuery}"</h2>
                <ul className="job-list">
                    {jobs.map((job) => (
                        <li key={job.id} className="job-list-item">
                            <h3>{job.title}</h3>
                            <p className="company">{job.company.display_name}</p>
                            <p className="location">{job.location.display_name}</p>
                            <p className="contract-time">{job.contract_time}</p>
                            <div className="button-group">
                                <button className="btn btn-primary">View</button>
                                <button className="btn btn-success">Apply</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default JobSearch;

