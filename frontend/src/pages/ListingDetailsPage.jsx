import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ListingDetails from '../components/ListingDetails';

const ListingDetailsPage = () => {
    const { id } = useParams();

    return (
        <div className="listing-details-page">
            <Navbar />
            <main className="main-content" style={{ marginTop: '80px' }}>
                <ListingDetails listingId={id} />
            </main>
        </div>
    );
};

export default ListingDetailsPage;
