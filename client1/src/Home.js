// Home.js

import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [noMatch, setNoMatch] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response =
                await axios.get('http://localhost:3001/api/jobs');
            setJobs(response.data);
            setFilteredJobs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        filterJobs(e.target.value);
    };

    const filterJobs = (keyword) => {
        if (!keyword) {
            setFilteredJobs(jobs);
            setNoMatch(false);
            return;
        }
        const filtered = jobs.filter(job =>
            job.title.toLowerCase().includes(keyword.toLowerCase()) ||
            job.company.toLowerCase().includes(keyword.toLowerCase()) ||
            job.location.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredJobs(filtered);
        setNoMatch(filtered.length === 0);
    };

    return (
        <div className="App">
            <header className="sticky-header">
                <h1 className="brand_name">
                    Job
                    Search Portal
                </h1>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="/postjob">Post_Job</a></li>
                        <li><input
                            type="text"
                            placeholder="Search your dream company..."
                            value={searchQuery}
                            onChange={handleInputChange}
                            className="search_button"
                        /></li>
                    </ul>
                </nav>
            </header>

            <div className="content-container">
                <section className="job-listings">
                    <h2>Latest Job Listings</h2>
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : jobs.length === 0 ? (
                        <h2 className="No_job_avilable">
                            No jobs available
                        </h2>
                    ) : noMatch ? (
                        <h2 className="No_job">
                            No matching job found
                        </h2>
                    ) : (
                        filteredJobs.map(job => (
                            <div key={job._id}
                                className={`job-container 
                                    ${job.isNew ? 'new-job' : ''}`}>
                                <h3 className="job_title">
                                    {job.title}
                                </h3>
                                <p className="company">
                                    Company: {job.company}
                                </p>
                                <p className="loaction">
                                    Location: {job.location}
                                </p>
                                <p>Description:{job.description}</p>
                                <p className="salary">
                                    Salary: {job.salary}
                                </p>
                                <button className="apply_button">
                                    Apply
                                </button>
                            </div>
                        ))
                    )}
                </section>
            </div>
        </div>
    );
};

export default Home;
