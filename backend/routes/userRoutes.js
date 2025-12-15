const express = require('express');
const router = express.Router();
const {
    getUserReviews,
    getUserMessages,
    becomeHost,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/reviews', getUserReviews);
router.get('/messages', getUserMessages);
router.post('/become-host', becomeHost);

module.exports = router;
