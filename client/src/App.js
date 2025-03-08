import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/auth/Signup';
import Login from './components/auth/Login';
import JobDashboard from './components/JobDashboard.js/JobDashboard';
import AddJobApplication from './components/AddJobApplication.js/AddJobApplication';

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <div className="App">
            <Routes>
                {/* Public routes */}
                {!token && (
                    <>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login setToken={setToken} />} />
                        <Route path="/" element={<Navigate to="/login" replace />} />
                    </>
                )}

                {/* Protected routes */}
                {token && (
                    <>
                        <Route path="/dashboard" element={<JobDashboard token={token} />} />
                        <Route path="/add-job" element={<AddJobApplication token={token} />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </>
                )}
            </Routes>
        </div>
    );
};

export default App;
