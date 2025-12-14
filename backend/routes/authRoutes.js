const express = require('express');
const router = express.Router();
const {
    registerUser,
    authUser,
    logoutUser,
    refreshAccessToken,
    getUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshAccessToken);
router.get('/profile', protect, getUserProfile);

module.exports = router;
