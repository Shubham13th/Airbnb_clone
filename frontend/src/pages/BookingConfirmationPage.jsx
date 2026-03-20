import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { AiFillStar, AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { BiShield } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';

// Utility to load script
const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

const BookingConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { price, nights, total, startDate, endDate, guests, listingId, listingTitle, listingImage } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState('razorpay');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        loadScript('https://checkout.razorpay.com/v1/checkout.js');
    }, []);

    // If no booking details, redirect
    if (!price || !location.state) {
        return (
            <div className="min-h-screen pt-24 px-6 text-center">
                <Navbar />
                <h2 className="text-2xl font-bold mt-8">No booking details found.</h2>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
                >
                    Go Home
                </button>
            </div>
        );
    }

    // Calculate price breakdown
    const cleaningFee = 100;
    const serviceFee = 150;
    const gst = Math.round(total * 0.18); // 18% GST
    const finalTotal = total + gst;

    const handleRazorpayPayment = async () => {
        if (!agreeToTerms) {
            alert('Please agree to the terms and conditions');
            return;
        }

        if (!phoneNumber || phoneNumber.length < 10) {
            alert('Please enter a valid phone number');
            return;
        }

        setIsProcessing(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to book.');
                navigate('/login');
                return;
            }

            // 1. Create Booking Hold
            const bookingRes = await fetch(`${config.API_BASE_URL}/api/bookings/hold`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    listingId,
                    startDate,
                    endDate,
                    guests,
                    totalPrice: finalTotal
                })
            });

            const bookingData = await bookingRes.json();
            if (!bookingRes.ok) throw new Error(bookingData.message || 'Failed to create booking');

            // 2. Create Razorpay Order
            const orderRes = await fetch(`${config.API_BASE_URL}/api/payments/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookingId: bookingData._id
                })
            });

            const orderData = await orderRes.json();
            if (!orderRes.ok) throw new Error(orderData.message || 'Failed to create payment order');

            // 3. Initialize Razorpay
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_RrT4ASi7j5Igah', // Razorpay Key ID
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Mytrip Clone',
                description: `Booking for ${nights} night${nights > 1 ? 's' : ''}`,
                image: 'https://via.placeholder.com/150',
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        // 4. Verify Payment
                        const verifyRes = await fetch(`${config.API_BASE_URL}/api/payments/verify`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                bookingId: bookingData._id
                            })
                        });

                        const verifyData = await verifyRes.json();
                        if (verifyData.success) {
                            console.log('Payment successful:', response);
                            navigate('/booking/success', {
                                state: {
                                    ...location.state,
                                    paymentId: response.razorpay_payment_id,
                                    orderId: response.razorpay_order_id,
                                    bookingId: bookingData._id,
                                    total: finalTotal
                                }
                            });
                        } else {
                            alert('Payment verification failed. Please contact support.');
                        }
                    } catch (error) {
                        console.error('Verification error:', error);
                        alert('Payment processed but verification failed. Please check your dashboard.');
                    }
                },
                prefill: {
                    name: user?.name || user?.username || '',
                    email: user?.email || '',
                    contact: phoneNumber
                },
                theme: {
                    color: '#FF385C'
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error('Payment initiation error:', error);
            if (error.message === 'Not authorized, token expired' || error.message === 'Not authorized, user not found') {
                alert('Your session has expired or is invalid. Please log in again.');
                logout();
                navigate('/login');
            } else {
                alert(error.message);
            }
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-6xl mx-auto pt-28 pb-12 px-6">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm font-semibold mb-4 hover:underline"
                    >
                        ← Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Confirm and pay</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Forms */}
                    <div className="space-y-6">
                        {/* Trip Details */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4">Your trip</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">Dates</p>
                                        <p className="text-gray-600 text-sm">
                                            {new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <button className="text-sm font-semibold underline">Edit</button>
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">Guests</p>
                                        <p className="text-gray-600 text-sm">{guests} guest{guests !== 1 ? 's' : ''}</p>
                                    </div>
                                    <button className="text-sm font-semibold underline">Edit</button>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4">Contact information</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="+91 9876543210"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Required for booking confirmation</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4">Payment method</h2>

                            <div className="space-y-3">
                                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="razorpay"
                                        checked={paymentMethod === 'razorpay'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-4 h-4 text-rose-600"
                                    />
                                    <div className="ml-3 flex-1">
                                        <p className="font-semibold">Pay with Razorpay</p>
                                        <p className="text-sm text-gray-600">UPI, Cards, Wallets & More</p>
                                    </div>
                                    <img
                                        src="https://razorpay.com/assets/razorpay-glyph.svg"
                                        alt="Razorpay"
                                        className="h-6"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Special Requests */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4">Special requests</h2>
                            <textarea
                                value={specialRequests}
                                onChange={(e) => setSpecialRequests(e.target.value)}
                                placeholder="Add any special requests (optional)"
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Let the host know anything they should be aware of
                            </p>
                        </div>

                        {/* Cancellation Policy */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <MdCancel /> Cancellation policy
                            </h2>
                            <div className="space-y-3 text-sm text-gray-700">
                                <div className="flex items-start gap-3">
                                    <AiOutlineCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                                    <p><strong>Free cancellation</strong> up to 48 hours before check-in</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <AiOutlineClockCircle className="text-orange-600 mt-0.5 flex-shrink-0" />
                                    <p><strong>50% refund</strong> for cancellations between 48 hours and 24 hours before check-in</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MdCancel className="text-red-600 mt-0.5 flex-shrink-0" />
                                    <p><strong>No refund</strong> for cancellations less than 24 hours before check-in</p>
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="mt-1 w-5 h-5 text-rose-600 rounded"
                                />
                                <p className="text-sm text-gray-700">
                                    I agree to the <span className="font-semibold underline">House Rules</span>, <span className="font-semibold underline">Cancellation Policy</span>, and <span className="font-semibold underline">Guest Refund Policy</span>. I also agree to pay the total amount shown if the host accepts my reservation request.
                                </p>
                            </label>
                        </div>

                        {/* Pay Button */}
                        <button
                            onClick={handleRazorpayPayment}
                            disabled={isProcessing || !agreeToTerms}
                            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-rose-600 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
                        >
                            {isProcessing ? 'Processing...' : `Confirm and pay ₹${finalTotal.toLocaleString()}`}
                        </button>
                    </div>

                    {/* Right Column - Price Summary */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                            {/* Property Preview */}
                            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
                                <div className="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                                    <img
                                        src={listingImage || 'https://via.placeholder.com/200'}
                                        alt="Property"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 line-clamp-2">
                                        {listingTitle || 'Premium Property'}
                                    </p>
                                    <div className="flex items-center gap-1 mt-1 text-xs">
                                        <AiFillStar className="text-black" />
                                        <span className="font-medium">4.95</span>
                                        <span className="text-gray-500">(124 reviews)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price Details */}
                            <h3 className="font-semibold text-lg mb-4">Price details</h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">₹{price.toLocaleString()} x {nights} night{nights > 1 ? 's' : ''}</span>
                                    <span className="font-medium">₹{(price * nights).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700 underline cursor-help" title="One-time cleaning fee">Cleaning fee</span>
                                    <span className="font-medium">₹{cleaningFee}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700 underline cursor-help" title="Service fee for using the platform">Service fee</span>
                                    <span className="font-medium">₹{serviceFee}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700 underline cursor-help" title="Goods and Services Tax (18%)">GST (18%)</span>
                                    <span className="font-medium">₹{gst.toLocaleString()}</span>
                                </div>

                                <div className="pt-4 mt-4 border-t-2 border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-base">Total (INR)</span>
                                        <span className="font-bold text-lg">₹{finalTotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-3 text-sm text-gray-600">
                                <BiShield className="text-green-600 text-2xl flex-shrink-0" />
                                <p>Your payment is secure and encrypted. We never store your card details.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmationPage;
