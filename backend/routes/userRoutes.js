const express = require('express');
const router = express.Router();
const {
    getUserReviews,
    getUserMessages,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/reviews', getUserReviews);
router.get('/messages', getUserMessages);

module.exports = router;
