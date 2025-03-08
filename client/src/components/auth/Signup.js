import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/auth/register', {
                email,
                password,
            });
            console.log('Response:', res.data);
            alert('Registration successful!');
            navigate('/login'); // Redirect to login page after successful registration
        } catch (err) {
            console.error(err);
            alert('Error in registration.');
        }
    };

    return (
        <div style={styles.container1}>
            <div>
                <h2 style={styles.heading}>Register</h2>
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
                    <button type="submit" style={styles.registerbutton}>
                        Register
                    </button>
                </form>
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
        backgroundColor: '#f0f2f5'
    },
    container2: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '300px'
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
    inputstyle: {
        // inputemail: {
        //     marginBottom: '1rem',
        //     padding: '10px',
        //     fontSize: '16px',
        //     borderRadius: '4px',
        //     border: '1px solid #ccc'
        // },
        // inputpassword: {
        //     marginBottom: '1rem',
        //     padding: '10px',
        //     fontSize: '16px',
        //     borderRadius: '4px',
        //     border: '1px solid #ccc',
        // },
        marginBottom: '1rem',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    registerbutton: {
        backgroundColor: '#1a73e8',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '1rem'
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
};

export default Register;
