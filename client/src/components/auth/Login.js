import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/auth/login', {
                email,
                password,
            });
            setToken(res.data.token); // Save the JWT token
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Error logging in.');
        }
    };

    return (
        <div style={styles.container1}>
            <div>
                <h2 style={styles.heading}>Login</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.inputemail}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.inputpassword}
                    />
                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>
                <div style={styles.container3}>
                    <p style={{ marginRight: '0.5rem' }}>
                        New user ?{' '}
                        <button
                            onClick={() => navigate('/register')}
                            style={styles.registerButton}
                        >
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
    },
    heading: {
        textAlign: 'center',
        color: '#1a73e8',
        marginBottom: '1.5rem'
    },
    form: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
    },
    inputemail: {
        marginBottom: '1rem',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    inputpassword: {
        marginBottom: '1rem',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        backgroundColor: '#1a73e8',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px', fontSize: '16px', cursor: 'pointer',
        marginTop: '1rem'
    },
    container3: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem'
    },
    registerButton: {
        backgroundColor: '#34a853',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer'
    },
};

export default Login;
