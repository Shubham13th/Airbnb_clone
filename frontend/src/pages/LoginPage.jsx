import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
import '../styles/pages/Auth.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.message || 'Failed to log in');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-page">
            <Navbar />
            <div className="auth-container" style={{ marginTop: '80px' }}>
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Log in to Mytrip</h1>
                        {error && <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</div>}
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div style={{ fontSize: '12px', fontWeight: '500', textAlign: 'right', marginTop: '5px' }}>
                            <Link to="/forgot-password" style={{ color: 'black', textDecoration: 'underline' }}>Forgot password?</Link>
                        </div>

                        <button type="submit" className="auth-btn">
                            Log in
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <button className="social-btn">
                        <FcGoogle size={20} /> Continue with Google
                    </button>
                    <button className="social-btn">
                        <FaApple size={20} /> Continue with Apple
                    </button>
                    <button className="social-btn">
                        <FaFacebook size={20} color="#1877F2" /> Continue with Facebook
                    </button>

                    <div className="auth-footer">
                        Don't have an account?
                        <Link to="/signup" className="auth-link">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
