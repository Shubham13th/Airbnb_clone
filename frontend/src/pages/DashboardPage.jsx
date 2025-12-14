import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfilePage from './ProfilePage'; // Reusing profile content
import StatsCard from '../components/Dashboard/StatsCard';
import PropertiesList from '../components/Dashboard/PropertiesList';
import BookingsList from '../components/Dashboard/BookingsList';
import WishlistPage from './WishlistPage';
import '../styles/pages/Dashboard.css';

const DashboardPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const activeTabParam = searchParams.get('tab') || 'trips';
    const [activeTab, setActiveTab] = useState(activeTabParam);

    useEffect(() => {
        setSearchParams({ tab: activeTab });
    }, [activeTab, setSearchParams]);

    // Mock Data for Hosting Stats
    const hostingStats = [
        { label: 'Total Earnings', value: '$2,450', trend: '+12% this month' },
        { label: 'Views', value: '1,240', trend: '+5% this month' },
        { label: 'Bookings', value: '8', trend: '+2 new' }
    ];

    const MOCK_PROPERTIES = [
        {
            id: 1,
            title: "Whitefish Estate",
            location: "Whitefish, Montana",
            price: 350,
            rating: 4.98,
            image: "https://a0.muscache.com/im/pictures/miso/Hosting-26117817/original/9da40e3c-5846-4dc0-95f2-1695dd88df3d.jpeg?im_w=720"
        },
        {
            id: 2,
            title: "Luxury Villa",
            location: "Malibu, California",
            price: 600,
            rating: 4.85,
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=720"
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'trips':
                return (
                    <div className="dashboard-content">
                        <h1>Trips</h1>
                        <p>Upcoming reservations</p>
                        <BookingsList />
                        <h2 style={{ marginTop: '40px' }}>Where you've been</h2>
                        <BookingsList past={true} />
                    </div>
                );
            case 'hosting':
                return (
                    <div className="dashboard-content">
                        <h1>Hosting Dashboard</h1>

                        <div className="stats-grid">
                            {hostingStats.map((stat, idx) => (
                                <StatsCard key={idx} stat={stat} />
                            ))}
                        </div>

                        <div className="properties-section-header">
                            <h2>Your properties</h2>
                            <button className="create-btn" onClick={() => navigate('/host/add-property')}>Add new property</button>
                        </div>
                        <PropertiesList properties={MOCK_PROPERTIES} />
                    </div>
                );
            case 'profile':
                // We'll just render the inner part of ProfilePage logic if possible, 
                // but for simplicity, we mock similar profile edit layout or reuse logic.
                // Assuming ProfilePage is standalone, we can either iframe it or reimplement.
                // Reimplementing a simple view for clearer separation.
                return (
                    <div className="dashboard-content">
                        <ProfilePage embedded={true} />
                    </div>
                );
            case 'wishlist':
                return (
                    <div className="dashboard-content">
                        {/* Reusing WishlistPage logic but styled for dashboard if needed, or just standard view */}
                        <WishlistPage />
                    </div>
                );
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="dashboard-container">
                <div className="dashboard-sidebar">
                    <button
                        className={`sidebar-item ${activeTab === 'trips' ? 'active' : ''}`}
                        onClick={() => setActiveTab('trips')}
                    >
                        Trips
                    </button>
                    <button
                        className={`sidebar-item ${activeTab === 'hosting' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hosting')}
                    >
                        Hosting
                    </button>
                    <button
                        className={`sidebar-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                        onClick={() => setActiveTab('wishlist')}
                    >
                        Wishlist
                    </button>
                    <button
                        className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                </div>
                <div className="dashboard-main">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
