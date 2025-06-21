import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { FcGoogle } from 'react-icons/fc';
import './Register.css';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate(); const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const [error, setError] = useState('');

    const { name, email, password, password2 } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password should be at least 6 characters long');
            return;
        } const newUser = {
            name,
            email,
            password,
        };

        const result = await register(newUser); if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message || 'Registration failed');
        }
    };

    return (
        <div className="register-container">
            <div className="register-form-container">
                <h1>Register</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={onSubmit}>                    <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        minLength={3}
                    />
                </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Confirm Password</label>
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <button type="submit" className="btn-submit">
                        Register
                    </button>
                </form>

                <div className="separator">
                    <span>OR</span>
                </div>

                <button className="google-login-btn" onClick={() => console.log('Google login clicked')}>
                    <FcGoogle className="google-icon" />
                    <span>Register with Google</span>
                </button>

                <p className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
