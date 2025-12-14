const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        listing: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Listing',
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        guests: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending',
        },
        paymentIntentId: {
            type: String, // Kept for Stripe backward compatibility if needed
        },
        paymentId: {
            type: String,
        },
        orderId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'refunded'],
            default: 'pending',
        },
        expiresAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
