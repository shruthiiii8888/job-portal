// ApplyJob.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ApplyJob.css';
import { useLocation } from 'react-router-dom';

const ApplyJob = () => {
    const location = useLocation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [jobId, setJobId] = useState(location.state?.jobId || ""); // Get jobId from state

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // Check if any of the fields are empty
        if (!name || !email || !phone || !coverLetter || !jobId) {
            toast.error('Please fill all fields to apply for the job.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3001/api/apply',
                { name, email, phone, coverLetter, jobId }
            );
            if (response.status === 201) {
                toast.success('Application submitted successfully!');
                setName("");
                setEmail("");
                setPhone("");
                setCoverLetter("");
                setJobId("");
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            if (error.response) {
                // Server responded with a status other than 2xx
                toast.error(`Failed to submit application: ${error.response.data.message || 'Please try again.'}`);
            } else if (error.request) {
                // No response was received
                toast.error('No response from server. Please check your network.');
            } else {
                // Something else happened
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <header>
                <h1>Job Application Portal</h1>
            </header>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Apply for Job</a></li>
                </ul>
            </nav>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        placeholder="Your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                    <label>Cover Letter:</label>
                    <textarea
                        placeholder="Write your cover letter..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)} />
                </div>
                <div>
                    <label>Job ID:</label>
                    <input
                        type="text"
                        placeholder="Enter Job ID"
                        value={jobId}
                        onChange={(e) => setJobId(e.target.value)} />
                </div>
                <button type="submit">Apply</button>
            </form>
        </div>
    );
};

export default ApplyJob;
