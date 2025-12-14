const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');

// @desc    Hold a booking slot (Atomic)
// @route   POST /api/bookings/hold
// @access  Private
const createBookingHold = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { listingId, startDate, endDate, guests, totalPrice } = req.body;

        if (!listingId || !startDate || !endDate || !guests || !totalPrice) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Check for overlapping bookings (Confirmed OR Pending & Not Expired)
        const existingBooking = await Booking.findOne({
            listing: listingId,
            status: { $in: ['confirmed', 'pending'] },
            $or: [
                {
                    // Check if current booking overlaps with existing
                    $and: [
                        { startDate: { $lt: end } },
                        { endDate: { $gt: start } }
                    ]
                }
            ],
            // For pending bookings, check if they are still valid (not expired)
            $expr: {
                $cond: {
                    if: { $eq: ['$status', 'pending'] },
                    then: { $gt: ['$expiresAt', new Date()] },
                    else: true // Confirmed bookings are always blocking
                }
            }
        }).session(session);

        if (existingBooking) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Dates are already booked or held' });
        }

        // Create Hold (Expires in 15 mins)
        const expiresAt = new Date(new Date().getTime() + 15 * 60000);

        const booking = await Booking.create(
            [
                {
                    user: req.user._id,
                    listing: listingId,
                    startDate: start,
                    endDate: end,
                    guests,
                    totalPrice,
                    status: 'pending',
                    expiresAt,
                },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(201).json(booking[0]);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Confirm a booking
// @route   POST /api/bookings/confirm/:id
// @access  Private
const confirmBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (booking.status === 'confirmed') {
            return res.status(400).json({ message: 'Booking already confirmed' });
        }

        if (booking.status === 'cancelled') {
            return res.status(400).json({ message: 'Booking is cancelled' });
        }

        if (new Date() > booking.expiresAt) {
            return res.status(400).json({ message: 'Booking hold expired' });
        }

        // Simulate Payment Processing here...
        // if (paymentSuccess) ...

        booking.status = 'confirmed';
        booking.expiresAt = undefined; // Clear expiry
        await booking.save();

        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
const getUserBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).populate(
        'listing',
        'title images price'
    );
    res.json(bookings);
};

module.exports = {
    createBookingHold,
    confirmBooking,
    getUserBookings,
};
