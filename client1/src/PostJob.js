// PostJob.js 

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PostJob.css';

const PostJob = () => {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [salary, setSalary] = useState("");
    const [jobs, setJobs] = useState([]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        
        // Check if any of the fields are empty
        if (!title || !company ||
            !location || !description
            || !salary) {
            toast.error('Please filled all fields to post a job.');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:3001/api/jobs',
                { title, company, location, description, salary }
            );
            if (response.status === 201) {
                toast.success('Job added successfully!');
                setTitle("");
                setCompany("");
                setLocation("");
                setDescription("");
                setSalary("");

                // Fetch the updated list of jobs
                axios.get('http://localhost:3001/api/jobs')
                    .then(response => setJobs(response.data))
                    .catch(err => console.log(err));
            }
        } catch (error) {
            console.error('Error adding job:', error);
            toast.error('Failed to add job. Please try again.');
        }
    };

    return (
        <div>
            <header>
                <h1>Job Search Portal</h1>
            </header>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Post_Job</a></li>
                </ul>
            </nav>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        placeholder="Job title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Company:</label>
                    <input
                        type="text"
                        placeholder="Company Name..."
                        value={company}
                        onChange={
                            (e) => setCompany(e.target.value)} />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        placeholder="Company Location..."
                        value={location}
                        onChange={
                            (e) => setLocation(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        placeholder="Description..."
                        value={description}
                        onChange={
                            (e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Salary:</label>
                    <input
                        type="number"
                        placeholder="salary..."
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PostJob;
