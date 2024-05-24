import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './JobDetails.css';

const JobDetails = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/v1/api/jobs/us/${jobId}?app_id=${process.env.REACT_APP_ADZUNA_APP_ID}&app_key=${process.env.REACT_APP_ADZUNA_APP_KEY}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setJob(data);
            } catch (error) {
                setError(error);
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
        return <div>Error: {error.message}</div>;
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
            <a href={job.redirect_url} className="btn btn-success">Apply</a>
        </div>
    );
};

export default JobDetails;
