const express = require('express');
const router = express.Router();
const {
    createBookingHold,
    confirmBooking,
    getUserBookings,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/hold', protect, createBookingHold);
router.post('/confirm/:id', protect, confirmBooking);
router.get('/', protect, getUserBookings);

module.exports = router;
