import React, { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://literate-space-engine-xrw6446qv9v92v9g9-5000.app.github.dev/api/auth/register',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        }
      )
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! Please check your email.');
        login(data);
        navigate('/')
      } else {
        console.log(data.message);
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type='submit'>Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}