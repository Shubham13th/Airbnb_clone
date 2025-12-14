const express = require('express');
const router = express.Router();
const {
    getHostListings,
    getHostBookings,
    getHostEarnings,
    getHostCalendar,
} = require('../controllers/hostController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.use(protect);
router.use(authorize('host'));

router.get('/listings', getHostListings);
router.get('/bookings', getHostBookings);
router.get('/earnings', getHostEarnings);
router.get('/calendar', getHostCalendar);

module.exports = router;
