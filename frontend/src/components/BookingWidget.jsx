import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { AiFillStar } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';
import '../styles/components/BookingWidget.css';

const BookingWidget = ({ price, rating, listingId, listingTitle, listingImage }) => {
    const { user } = useAuth();
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [showGuestMenu, setShowGuestMenu] = useState(false);

    const navigate = useNavigate();

    // Calculate nights
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;
    const timeDiff = Math.abs(endDate - startDate);
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) || 1; // Default to 1 night if same day

    // Calculate costs
    const cleaningFee = 100;
    const serviceFee = 150;
    const totalBeforeTaxes = (price * nights) + cleaningFee + serviceFee;

    const handleReserve = () => {
        if (!user) {
            // Redirect to login if not authenticated
            navigate('/login', { state: { from: '/book/confirm' } });
            return;
        }

        navigate('/book/confirm', {
            state: {
                price,
                nights,
                total: totalBeforeTaxes,
                startDate,
                endDate,
                guests: adults + children,
                listingId,
                listingTitle,
                listingImage
            }
        });
    };

    return (
        <div className="booking-widget">
            <div className="booking-header">
                <div>
                    <span className="booking-price">₹{price}</span>
                    <span className="booking-price-unit"> night</span>
                </div>
                <div className="booking-rating">
                    <AiFillStar size={14} />
                    <span>{rating} · 12 reviews</span>
                </div>
            </div>

            <div className="booking-inputs">
                <div
                    className="date-picker-trigger"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                >
                    <div className="date-input">
                        <label>CHECK-IN</label>
                        <span>{startDate.toLocaleDateString()}</span>
                    </div>
                    <div className="date-input" style={{ borderLeft: '1px solid #ddd' }}>
                        <label>CHECKOUT</label>
                        <span>{endDate.toLocaleDateString()}</span>
                    </div>
                </div>
                {showDatePicker && (
                    <div className="absolute top-12 left-0 right-0 z-50 bg-white shadow-xl border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowDatePicker(false); }}
                                className="text-sm font-semibold underline hover:text-gray-600"
                            >
                                Close
                            </button>
                        </div>
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDateRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                            rangeColors={['#222']}
                            minDate={new Date()}
                        />
                    </div>
                )}
                <div className="guests-input relative">
                    <label>GUESTS</label>
                    <div
                        className="guests-select cursor-pointer flex justify-between items-center"
                        onClick={() => setShowGuestMenu(!showGuestMenu)}
                    >
                        <span>{adults + children} guest{adults + children !== 1 ? 's' : ''}</span>
                        <span>{showGuestMenu ? '▲' : '▼'}</span>
                    </div>
                    {showGuestMenu && (
                        <div className="absolute top-full left-0 right-0 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-40 mt-2">
                            {/* Adults */}
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <div className="font-semibold">Adults</div>
                                    <div className="text-xs text-gray-500">Age 13+</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black disabled:opacity-30"
                                        onClick={() => setAdults(Math.max(1, adults - 1))}
                                        disabled={adults <= 1}
                                    >-</button>
                                    <span>{adults}</span>
                                    <button
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black"
                                        onClick={() => setAdults(adults + 1)}
                                    >+</button>
                                </div>
                            </div>
                            {/* Children */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-semibold">Children</div>
                                    <div className="text-xs text-gray-500">Ages 2–12</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black disabled:opacity-30"
                                        onClick={() => setChildren(Math.max(0, children - 1))}
                                        disabled={children <= 0}
                                    >-</button>
                                    <span>{children}</span>
                                    <button
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black"
                                        onClick={() => setChildren(children + 1)}
                                    >+</button>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
                                <button
                                    className="text-sm font-semibold underline"
                                    onClick={() => setShowGuestMenu(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <button className="reserve-btn" onClick={handleReserve}>
                Reserve
            </button>
            <p className="no-charge-text">You won't be charged yet</p>

            <div className="price-breakdown">
                <div className="price-row">
                    <span>₹{price} x {nights} nights</span>
                    <span>₹{price * nights}</span>
                </div>
                <div className="price-row">
                    <span>Cleaning fee</span>
                    <span>₹{cleaningFee}</span>
                </div>
                <div className="price-row">
                    <span>Service fee</span>
                    <span>₹{serviceFee}</span>
                </div>
                <hr />
                <div className="price-row total">
                    <span>Total before taxes</span>
                    <span>₹{totalBeforeTaxes}</span>
                </div>
            </div>
        </div>
    );
};

export default BookingWidget;
