import React from 'react';

const BookingCard = ({ booking }) => {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
            <div className="h-48 bg-gray-200 relative">
                <img
                    src={booking.image || 'https://via.placeholder.com/400'}
                    alt={booking.title}
                    className="w-full h-full object-cover"
                />
                <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                    {booking.status}
                </span>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{booking.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-1">{booking.location}</p>
                <p className="text-gray-900 text-sm mt-2 font-medium">{booking.dates}</p>
            </div>
        </div>
    );
};

export default BookingCard;
