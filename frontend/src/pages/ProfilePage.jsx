import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { BsShieldCheck } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import '../styles/pages/Auth.css'; // Reusing some auth styles
import '../styles/pages/ProfilePage.css';

const ProfilePage = ({ embedded = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 555-0123',
        about: 'Love traveling and exploring new places.'
    });

    const handleSave = () => {
        setIsEditing(false);
        // Save logic here
    };

    return (
        <div className={embedded ? "profile-embedded" : "profile-page"}>
            {!embedded && <Navbar />}
            <main className={embedded ? "profile-content-embedded" : "profile-content"}>
                <div className="profile-layout">
                    {/* Left Column: Profile Card */}
                    <div className="profile-sidebar">
                        <div className="profile-card">
                            <div className="profile-image-section">
                                <div className="profile-avatar-large">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="profile-badge">
                                    <BsShieldCheck size={16} />
                                </div>
                            </div>
                            <h2>{user.name}</h2>
                            <p>Guest</p>
                        </div>

                        <div className="profile-verification">
                            <h3>{user.name} confirmed</h3>
                            <div className="verification-item">
                                <AiOutlineCheck /> Identity
                            </div>
                            <div className="verification-item">
                                <AiOutlineCheck /> Email address
                            </div>
                            <div className="verification-item">
                                <AiOutlineCheck /> Phone number
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="profile-main">
                        <div className="profile-header-section">
                            <h1>Your Profile</h1>
                            <p>The information you share will be used across Airbnb to help build trust with other Hosts and guests.</p>
                        </div>

                        <div className="profile-details-grid">
                            {/* Editable Fields */}
                            <div className="profile-field">
                                <div className="field-header">
                                    <label>Legal name</label>
                                    <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</button>
                                </div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={user.name}
                                        onChange={e => setUser({ ...user, name: e.target.value })}
                                        className="form-input"
                                    />
                                ) : (
                                    <p>{user.name}</p>
                                )}
                            </div>

                            <div className="profile-field">
                                <div className="field-header">
                                    <label>Email address</label>
                                    <button>Edit</button>
                                </div>
                                <p>{user.email}</p>
                            </div>

                            <div className="profile-field">
                                <div className="field-header">
                                    <label>Phone number</label>
                                    <button>Edit</button>
                                </div>
                                <p>{user.phone}</p>
                            </div>

                            <div className="profile-field">
                                <div className="field-header">
                                    <label>About</label>
                                    <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</button>
                                </div>
                                {isEditing ? (
                                    <textarea
                                        value={user.about}
                                        onChange={e => setUser({ ...user, about: e.target.value })}
                                        className="form-input"
                                        rows="4"
                                    />
                                ) : (
                                    <p>{user.about}</p>
                                )}
                            </div>

                            {isEditing && (
                                <button className="auth-btn" style={{ width: 'fit-content' }} onClick={handleSave}>
                                    Save changes
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
