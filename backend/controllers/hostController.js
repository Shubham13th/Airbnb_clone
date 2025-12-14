const Listing = require('../models/Listing');
const Booking = require('../models/Booking');

// @desc    Get listings owned by host
// @route   GET /api/host/listings
// @access  Private (Host)
const getHostListings = async (req, res) => {
    const listings = await Listing.find({ user: req.user._id });
    res.json(listings);
};

// @desc    Get bookings for host's listings
// @route   GET /api/host/bookings
// @access  Private (Host)
const getHostBookings = async (req, res) => {
    const listings = await Listing.find({ user: req.user._id });
    const listingIds = listings.map((l) => l._id);

    const bookings = await Booking.find({ listing: { $in: listingIds } })
        .populate('user', 'username email')
        .populate('listing', 'title');

    res.json(bookings);
};

// @desc    Get host earnings
// @route   GET /api/host/earnings
// @access  Private (Host)
const getHostEarnings = async (req, res) => {
    const listings = await Listing.find({ user: req.user._id });
    const listingIds = listings.map((l) => l._id);

    const bookings = await Booking.find({
        listing: { $in: listingIds },
        paymentStatus: 'paid',
    });

    const totalEarnings = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

    res.json({ totalEarnings });
};

// @desc    Get host calendar (booked dates)
// @route   GET /api/host/calendar
// @access  Private (Host)
const getHostCalendar = async (req, res) => {
    const listings = await Listing.find({ user: req.user._id });
    const listingIds = listings.map((l) => l._id);

    const bookings = await Booking.find({
        listing: { $in: listingIds },
        status: { $in: ['confirmed', 'pending'] },
    }).select('listing startDate endDate status');

    res.json(bookings);
};

module.exports = {
    getHostListings,
    getHostBookings,
    getHostEarnings,
    getHostCalendar,
};
