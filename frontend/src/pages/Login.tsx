import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const result = await login(formData); if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message || 'Login failed');
        }
    }; return (
        <div className="login-container">
            <div className="login-form-container">
                <div className="login-form">
                    <h1>Log in</h1>
                    {error && <div className="error-message">{error}</div>}                    <button
                        type="button"
                        className="google-sign-in-btn"
                        onClick={googleLogin}
                    >
                        <FcGoogle /> Sign in with Google
                    </button>

                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="name@email.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password" id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="••••••"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit">
                            Sign in
                        </button>
                    </form>

                    <p className="register-link">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
