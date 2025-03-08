import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobDashbord = ({ token }) => {
    const [application, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/applications', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setApplications(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchApplications();
    }, [token]);

    return (
        <div>
            <h2>Your Job Application</h2>
            <ul>
                {application.map((app) => (
                    <li key={app._id}>
                        {app.jobTitle} at {app.companyName} - {app.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobDashbord;