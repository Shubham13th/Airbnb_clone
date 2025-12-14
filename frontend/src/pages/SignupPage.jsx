import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
import '../styles/pages/Auth.css';

const SignupPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await signup(firstName, lastName, email, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.message || 'Failed to sign up');
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
                        <h1>Sign up</h1>
                        {error && <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</div>}
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="First name"
                                className="form-input"
                                style={{ borderRadius: '8px 8px 0 0', borderBottom: 'none' }}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                className="form-input"
                                style={{ borderRadius: '0 0 8px 8px' }}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-helper-text">make sure it matches the name on your government ID.</div>

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

                        <div style={{ fontSize: '12px', color: '#717171' }}>
                            By selecting Agree and continue, I agree to Airbnb's Terms of Service.
                        </div>

                        <button type="submit" className="auth-btn">
                            Agree and continue
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
                        Already have an account?
                        <Link to="/login" className="auth-link">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
