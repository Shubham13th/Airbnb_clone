import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ListingCard from '../components/ListingCard';
import { MOCK_LISTINGS } from '../data/mockListings';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const savedIds = JSON.parse(localStorage.getItem('wishlist')) || [];
        const savedListings = MOCK_LISTINGS.filter(listing => savedIds.includes(listing.id));
        setWishlist(savedListings);
    }, []);

    // Custom toggle handler to update the list immediately when removing items on this page
    const handleWishlistChange = (id) => {
        const savedIds = JSON.parse(localStorage.getItem('wishlist')) || [];
        const newIds = savedIds.filter(savedId => savedId !== id);
        localStorage.setItem('wishlist', JSON.stringify(newIds));

        // Update local state to remove the item from view
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 px-8 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.map(listing => (
                            <ListingCard
                                key={listing.id}
                                data={listing}
                            // onWishlistChange={handleWishlistChange} // Commenting out if not implemented in child
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Your wishlist is empty</p>
                        <p className="text-gray-400 mt-2">Start adding properties to your wishlist!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
