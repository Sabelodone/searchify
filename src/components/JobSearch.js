import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './JobSearch.css'; // Import your custom CSS

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const appId = process.env.REACT_APP_ADZUNA_APP_ID;
    const appKey = process.env.REACT_APP_ADZUNA_APP_KEY;
    const apiUrl = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setJobs(data.results))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleViewClick = (jobId) => {
    console.log('View job', jobId);
    // Implement the logic to view job details here
  };

  const handleApplyClick = (jobId) => {
    console.log('Apply for job', jobId);
    // Implement the logic to apply for job here
  };

  return (
    <div className="container job-search-container">
      <header className="my-4 text-center">
        <Link to="/" className="home-link">
          {/* Optionally add your logo or home link here */}
        </Link>
        <div className="input-group mt-3">
          <input type="text" className="form-control" placeholder="Search for jobs..." />
          <button className="btn btn-primary">Search</button>
        </div>
      </header>
      
      <div className="job-list-container">
        <ul className="list-group">
          {jobs.map(job => (
            <li key={job.id} className="list-group-item">
              <h2 className="job-title">{job.title}</h2>
              <p className="company">{job.company.display_name}</p>
              <p className="location">{job.location.display_name}</p>
              <p className="contract-time">{job.contract_time}</p>
              <div className="button-group">
                <button className="btn btn-secondary" onClick={() => handleViewClick(job.id)}>View</button>
                <button className="btn btn-primary" onClick={() => handleApplyClick(job.id)}>Apply</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobSearch;


