import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Auth.css';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/auth/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Email sent! Please check your inbox (and spam folder).');
                // Optional: navigate to login after a delay
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to send email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <Navbar />
            <div className="auth-container" style={{ marginTop: '100px' }}>
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Forgot Password</h1>
                        <p className="text-sm text-gray-500 mt-2">Enter your email to receive a reset link.</p>
                        {message && <div style={{ color: 'green', marginTop: '10px', fontSize: '14px' }}>{message}</div>}
                        {error && <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</div>}
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <button type="submit" className="auth-btn" disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Remember your password?
                        <span onClick={() => navigate('/login')} className="auth-link cursor-pointer"> Log in</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
