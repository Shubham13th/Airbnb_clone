import React, { useState } from 'react';
import { BiSearch, BiPlus, BiMinus } from 'react-icons/bi';

const SearchBar = ({ setSearchQuery, searchQueryLocal, dateRange, guests, setDateRange, setGuests }) => {
    const [localSearch, setLocalSearch] = useState(searchQueryLocal || '');
    const [checkIn, setCheckIn] = useState(dateRange?.startDate || '');
    const [checkOut, setCheckOut] = useState(dateRange?.endDate || '');
    const [guestCount, setGuestCount] = useState(guests || 1);
    const [showGuestPicker, setShowGuestPicker] = useState(false);

    const handleSearch = () => {
        if (setSearchQuery) {
            setSearchQuery(localSearch);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleCheckInChange = (value) => {
        setCheckIn(value);
        if (setDateRange) {
            setDateRange({ startDate: value, endDate: checkOut });
        }
    };

    const handleCheckOutChange = (value) => {
        setCheckOut(value);
        if (setDateRange) {
            setDateRange({ startDate: checkIn, endDate: value });
        }
    };

    const incrementGuests = () => {
        const newCount = guestCount + 1;
        setGuestCount(newCount);
        if (setGuests) {
            setGuests(newCount);
        }
    };

    const decrementGuests = () => {
        const newCount = guestCount > 1 ? guestCount - 1 : 1;
        setGuestCount(newCount);
        if (setGuests) {
            setGuests(newCount);
        }
    };

    return (
        <div className="flex border border-gray-300 rounded-full shadow-sm hover:shadow-md transition bg-white relative">
            {/* Where */}
            <div className="px-5 py-2 hover:bg-gray-100 rounded-full relative flex-1">
                <div className="text-xs font-bold text-gray-800">Where</div>
                <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search destinations"
                    className="text-sm bg-transparent outline-none text-gray-600 w-full placeholder-gray-400"
                />
            </div>

            <div className="w-[1px] bg-gray-300 my-2"></div>

            {/* Check in */}
            <div className="px-5 py-2 hover:bg-gray-100 rounded-full cursor-pointer">
                <div className="text-xs font-bold text-gray-800">Check in</div>
                <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    className="text-sm bg-transparent outline-none text-gray-600 cursor-pointer"
                    placeholder="Add dates"
                />
            </div>

            <div className="w-[1px] bg-gray-300 my-2"></div>

            {/* Check out */}
            <div className="px-5 py-2 hover:bg-gray-100 rounded-full cursor-pointer">
                <div className="text-xs font-bold text-gray-800">Check out</div>
                <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => handleCheckOutChange(e.target.value)}
                    className="text-sm bg-transparent outline-none text-gray-600 cursor-pointer"
                    placeholder="Add dates"
                />
            </div>

            <div className="w-[1px] bg-gray-300 my-2"></div>

            {/* Who */}
            <div className="px-5 py-2 flex items-center gap-3 hover:bg-gray-100 rounded-full pl-5 pr-2 relative">
                <div
                    className="cursor-pointer"
                    onClick={() => setShowGuestPicker(!showGuestPicker)}
                >
                    <div className="text-xs font-bold text-gray-800">Who</div>
                    <div className="text-sm text-gray-600">
                        {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
                    </div>
                </div>

                <button
                    onClick={handleSearch}
                    className="bg-[#FF385C] text-white p-3 rounded-full flex items-center justify-center hover:bg-[#E31C5F] transition"
                >
                    <BiSearch size={16} />
                </button>

                {/* Guest Picker Dropdown */}
                {showGuestPicker && (
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-64 z-50">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-gray-800">Guests</span>
                            <button
                                onClick={() => setShowGuestPicker(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">Number of guests</span>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={decrementGuests}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
                                    disabled={guestCount <= 1}
                                >
                                    <BiMinus size={16} />
                                </button>
                                <span className="w-8 text-center font-semibold">{guestCount}</span>
                                <button
                                    onClick={incrementGuests}
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-800 transition"
                                >
                                    <BiPlus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
