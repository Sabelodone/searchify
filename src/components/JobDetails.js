// JobDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './JobDetails.css';

const appId = process.env.REACT_APP_ADZUNA_APP_ID;
const appKey = process.env.REACT_APP_ADZUNA_APP_KEY;

const JobDetails = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.adzuna.com/v1/api/jobs/us/${jobId}?app_id=${appId}&app_key=${appKey}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (!data || Object.keys(data).length === 0) {
                    throw new Error('No job details available');
                }
                setJob(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!job) {
        return <div>No job details available</div>;
    }

    return (
        <div className="job-details-container">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p className="company">{job.company.display_name}</p>
            <p className="location">{job.location.display_name}</p>
            <p className="contract-time">{job.contract_time}</p>
            <a href={job.redirect_url} className="btn btn-success" target="_blank" rel="noopener noreferrer">Apply</a>
        </div>
    );
};

export default JobDetails;
