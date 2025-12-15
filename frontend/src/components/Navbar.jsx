import React, { useState, useEffect } from 'react';
import { BiSearch, BiGlobe, BiMenu } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/components/Navbar.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({ setSearchQuery, searchQueryLocal: propSearchQuery, dateRange: propDateRange, guests: propGuests, setDateRange, setGuests }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            {/* Logo */}
            <div className="navbar-logo" onClick={() => navigate('/')} role="button" tabIndex={0}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
                    alt="Airbnb"
                    className="logo-img"
                />
            </div>

            {/* Desktop Search Bar */}
            <div className="navbar-search desktop-only">
                <SearchBar
                    setSearchQuery={setSearchQuery}
                    searchQueryLocal={propSearchQuery}
                    dateRange={propDateRange}
                    guests={propGuests}
                    setDateRange={setDateRange}
                    setGuests={setGuests}
                />
            </div>

            {/* Mobile Search Trigger */}
            <div className="navbar-search mobile-only" onClick={() => setMobileSearchOpen(!mobileSearchOpen)}>
                <div className="mobile-search-trigger">
                    <BiSearch size={18} />
                    <span>Anywhere • Any week • Add guests</span>
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="navbar-actions">
                <div className="host-link desktop-only" onClick={async () => {
                    if (!user) {
                        navigate('/login');
                        return;
                    }
                    if (user.role !== 'host') {
                        const confirmHost = window.confirm("You need to become a host to list properties. Do you want to become a host?");
                        if (confirmHost) {
                            try {
                                const token = localStorage.getItem('token');
                                const res = await fetch('http://localhost:5000/api/user/become-host', {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                    }
                                });
                                if (res.ok) {
                                    const updatedUser = await res.json();
                                    // We need to update auth context here, but for now let's just update local storage and reload or use a context method if available
                                    // Ideally using updateUser from context
                                    // For this step, I'll rely on the page reload or context update if I can access it uniquely, 
                                    // but since I can't easily destructure updateUser here without modifying the hook call above (which I will do in next step if needed),
                                    // I'll assume standard flow or force a refresh/re-login.
                                    // proper way:
                                    alert("You are now a host!");
                                    navigate('/host/add-property');
                                    window.location.reload(); // Simple fix to refresh context for now
                                } else {
                                    alert("Failed to become host.");
                                }
                            } catch (err) {
                                console.error(err);
                                alert("Error updating role.");
                            }
                        }
                    } else {
                        navigate('/host/add-property');
                    }
                }}>
                    Switch to hosting
                </div>
                <div className="globe-icon desktop-only">
                    <BiGlobe size={18} />
                </div>

                {/* User Menu */}
                <div className="profile-menu-container">
                    <div
                        className="profile-menu-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <BiMenu size={20} />
                        {user ? (
                            <div className="user-avatar-placeholder">
                                {user.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        ) : (
                            <FaUserCircle size={30} color="#717171" />
                        )}
                    </div>

                    {isMenuOpen && (
                        <>
                            {/* Click outside overlay */}
                            <div
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    zIndex: 999
                                }}
                                onClick={() => setIsMenuOpen(false)}
                            />
                            <div className="profile-dropdown animate-slide-down">
                                {user ? (
                                    <>
                                        <div className="menu-item font-semibold">
                                            Hello, {user.name || 'User'}
                                        </div>
                                        <div className="menu-divider"></div>
                                        <div className="menu-item" onClick={() => { navigate('/dashboard?tab=trips'); setIsMenuOpen(false); }}>
                                            Trips
                                        </div>
                                        <div className="menu-item" onClick={() => { navigate('/wishlist'); setIsMenuOpen(false); }}>
                                            Wishlist
                                        </div>
                                        <div className="menu-item" onClick={() => { navigate('/dashboard?tab=hosting'); setIsMenuOpen(false); }}>
                                            Manage Listings
                                        </div>
                                        <div className="menu-item" onClick={() => { navigate('/dashboard?tab=profile'); setIsMenuOpen(false); }}>
                                            Account
                                        </div>
                                        <div className="menu-divider"></div>
                                        <div className="menu-item" onClick={handleLogout}>
                                            Log out
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="menu-item font-bold" onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}>
                                            Sign up
                                        </div>
                                        <div className="menu-item" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>
                                            Log in
                                        </div>
                                        <div className="menu-divider"></div>
                                        <div className="menu-item" onClick={() => { navigate('/host/add-property'); setIsMenuOpen(false); }}>
                                            Airbnb your home
                                        </div>
                                        <div className="menu-item">Help Center</div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Search Modal/Expansion */}
            {mobileSearchOpen && (
                <div className="mobile-search-overlay">
                    <div className="mobile-search-bar-container">
                        <SearchBar
                            setSearchQuery={setSearchQuery}
                            searchQueryLocal={propSearchQuery}
                            dateRange={propDateRange}
                            guests={propGuests}
                            setDateRange={setDateRange}
                            setGuests={setGuests}
                            isMobile={true}
                        />
                        <button className="close-mobile-search" onClick={() => setMobileSearchOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
