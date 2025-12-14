import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AiFillCheckCircle, AiFillStar } from 'react-icons/ai';
import { BiCalendar, BiUser, BiMapPin } from 'react-icons/bi';
import { MdPayment } from 'react-icons/md';

const BookingSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { paymentId, orderId, price, nights, total, startDate, endDate, guests, listingTitle } = location.state || {};
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        // Confetti effect timeout
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!paymentId) {
        return (
            <div className="min-h-screen pt-24 px-6 text-center">
                <Navbar />
                <h2 className="text-2xl font-bold mt-8">Payment information not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
                >
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
            <Navbar />

            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-fall"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 100}px`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 3}s`
                            }}
                        >
                            🎉
                        </div>
                    ))}
                </div>
            )}

            <div className="max-w-3xl mx-auto pt-32 pb-12 px-6">
                {/* Success Banner */}
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center mb-8 animate-scale-in">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
                        <AiFillCheckCircle className="text-green-600 text-5xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Booking Confirmed! 🎊
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">
                        Your payment was successful
                    </p>
                    <p className="text-sm text-gray-500">
                        Confirmation email sent to your inbox
                    </p>
                </div>

                {/* Booking Details */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <BiCalendar /> Trip Details
                    </h2>

                    <div className="space-y-6">
                        {/* Property Name */}
                        <div className="pb-6 border-b border-gray-100">
                            <p className="text-sm text-gray-500 mb-1">Property</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {listingTitle || 'Premium Property Stay'}
                            </p>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-6 pb-6 border-b border-gray-100">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Check-in</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {new Date(startDate).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                                <p className="text-sm text-gray-500">After 3:00 PM</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Check-out</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {new Date(endDate).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                                <p className="text-sm text-gray-500">Before 11:00 AM</p>
                            </div>
                        </div>

                        {/* Guests */}
                        <div className="pb-6 border-b border-gray-100">
                            <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                <BiUser /> Guests
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                                {guests} guest{guests !== 1 ? 's' : ''}
                            </p>
                        </div>

                        {/* Payment Details */}
                        <div>
                            <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                                <MdPayment /> Payment
                            </p>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Payment ID</span>
                                    <span className="font-mono text-xs bg-white px-2 py-1 rounded border">
                                        {paymentId}
                                    </span>
                                </div>
                                {orderId && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Order ID</span>
                                        <span className="font-mono text-xs bg-white px-2 py-1 rounded border">
                                            {orderId}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
                                    <span>Total Paid</span>
                                    <span className="text-green-600">₹{total?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What's Next */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-6">
                    <h3 className="text-xl font-bold mb-4">What's next?</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                            <p className="text-gray-700">Check your email for booking confirmation and receipt</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                            <p className="text-gray-700">The host will send check-in instructions closer to your arrival</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                            <p className="text-gray-700">View your trip details anytime from your dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate('/dashboard?tab=trips')}
                        className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-rose-600 hover:to-pink-700 transition shadow-lg"
                    >
                        View My Trips
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:border-gray-400 transition"
                    >
                        Explore More Properties
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
                .animate-fall {
                    animation: fall linear forwards;
                }
                @keyframes scale-in {
                    from {
                        transform: scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-scale-in {
                    animation: scale-in 0.4s ease-out;
                }
                @keyframes bounce-in {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }
                .animate-bounce-in {
                    animation: bounce-in 0.6s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default BookingSuccessPage;
