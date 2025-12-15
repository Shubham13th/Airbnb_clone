import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/Auth.css';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { resetToken } = useParams();
    const navigate = useNavigate();
    const { login } = useAuth(); // Assuming we might want to update context, but backend logs us in via token. 
    // Actually, backend sends token, so we can store it.

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch(`http://localhost:5000/api/auth/resetpassword/${resetToken}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Password Reset Successful! Redirecting...');
                localStorage.setItem('token', data.accessToken);
                // Also update user in context if possible, but for now simple redirect
                setTimeout(() => {
                    navigate('/');
                    window.location.reload(); // To refresh AuthContext
                }, 2000);
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to reset password. Link might be invalid or expired.');
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
                        <h1>Reset Password</h1>
                        <p className="text-sm text-gray-500 mt-2">Enter your new password below.</p>
                        {message && <div style={{ color: 'green', marginTop: '10px', fontSize: '14px' }}>{message}</div>}
                        {error && <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{error}</div>}
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="form-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className="auth-btn" disabled={isLoading}>
                            {isLoading ? 'Resetting...' : 'Set New Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
