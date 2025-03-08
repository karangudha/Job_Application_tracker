import React, { useState } from 'react';
import axios from 'axios';

const AddJobApplication = ({ token }) => {
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [status, setStatus] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Sending login request');
        try {
            await axios.post('http://localhost:4000/api/applications', {
                jobTitle,
                companyName,
                status
            }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Job application added successfully!');
        }
        catch (err) {
            console.error(err);
            alert('Error adding application.');
        }
    };

    return (
        <div>
            <h2>Add Job Application</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <button type="submit">Add Application</button>
            </form>
        </div>
    );
};

export default AddJobApplication;