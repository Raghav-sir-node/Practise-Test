import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        fetch('https://literate-space-engine-xrw6446qv9v92v9g9-5000.app.github.dev/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Login failed');
            }
        }).then((data) => {
            alert('Login successful!');
            login(data);
            navigate('/');
        }).catch((error) => {
            console.log(error, "in Login.jsx");
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login Page</h1>
                <input type="email" placeholder="email" value={email} onChange={(e) => { setEmail(e.target.value)}} required/>
                <input type="password" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required/>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>

        </div>
    )

}