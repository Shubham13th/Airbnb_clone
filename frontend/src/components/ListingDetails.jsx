import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillStar, AiOutlineShareAlt, AiOutlineHeart } from 'react-icons/ai';
import config from '../config';
import BookingWidget from './BookingWidget';
import ImageGallery from './ImageGallery';
import ReviewCard from './ReviewCard';
import { MOCK_LISTINGS } from '../data/mockListings';

const ListingDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch(`${config.API_BASE_URL}/api/listings/${id}`); // Fetch specific listing by ID
                const data = await res.json();

                if (res.ok) {
                    setListing(data);
                } else {
                    setListing(null);
                }
            } catch (error) {
                console.error("Error fetching listing:", error);
                setListing(null);
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    if (loading) return <div className="p-20 text-center">Loading...</div>;
    if (!listing) return <div className="p-20 text-center">Listing not found</div>;

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <AiFillStar className="text-primary" />
                            <span className="font-semibold text-black">{listing.rating || '4.9'}</span>
                            <span className="underline cursor-pointer">{listing.numReviews || 12} reviews</span>
                            <span>·</span>
                            <span className="underline cursor-pointer font-semibold text-black">
                                {typeof listing.location === 'string' ? listing.location : 'Authentic Indian Experience'}
                            </span>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                                <AiOutlineShareAlt /> Share
                            </button>
                            <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                                <AiOutlineHeart /> Save
                            </button>
                        </div>
                    </div>
                </div>

                {/* Images */}
                <ImageGallery images={listing.images || [listing.image]} />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
                    {/* Left Column: Info */}
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center pb-8 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-semibold mb-1">Hosted by {listing.user?.username || 'Host'}</h2>
                                <p className="text-gray-500">Superhost · 4 years hosting</p>
                            </div>
                            <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                        </div>

                        <div className="py-8 border-b border-gray-200 space-y-6">
                            {(listing.features || [
                                { title: "Dedicated workspace", desc: "A common area with wifi that’s well-suited for working." },
                                { title: "Self check-in", desc: "Check yourself in with the keypad." }
                            ]).map((feature, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-1 font-bold text-lg text-gray-700">✓</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                        <p className="text-gray-500 text-sm">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="py-8 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold mb-4">About this place</h2>
                            <p className="text-gray-700 leading-relaxed">{listing.description}</p>
                        </div>

                        <div className="py-8 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold mb-6">What this place offers</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {(listing.amenities || []).map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-gray-700">
                                        <span>•</span> {amenity}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="py-8 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold mb-6">Where you’ll be</h2>
                        {/* Map placeholder code remains same */}
                        <div className="w-full h-80 bg-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                            <div className="text-center p-4">
                                <p className="font-semibold text-lg mb-1">{typeof listing.location === 'string' ? listing.location : 'India'}</p>
                                <p className="text-sm text-gray-500">(Map visualization placeholder)</p>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-700">{typeof listing.location === 'string' ? listing.location : 'Beautiful location in India'}</p>
                    </div>
                </div>

                {/* Right Column: Booking Widget */}
                <div>
                    <BookingWidget
                        price={listing.price}
                        rating={listing.rating || 4.9}
                        listingId={listing._id}
                        listingTitle={listing.title}
                        listingImage={listing.images?.[0] || listing.image}
                    />
                </div>
            </div>

            {/* Reviews Section using ReviewCard */}
            <div className="mt-12 pt-12 border-t border-gray-200">
                <h2 className="text-2xl font-semibold flex items-center gap-2 mb-8">
                    <AiFillStar className="text-primary" /> {listing.rating} · {listing.reviewsCount} reviews
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map(i => (
                        <ReviewCard
                            key={i}
                            review={{
                                author: "John Doe",
                                date: "October 2023",
                                content: "This place was absolutely amazing! The views were even better than the photos.",
                                avatar: null
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ListingDetails;
