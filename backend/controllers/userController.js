const Review = require('../models/Review');
const Message = require('../models/Message');

// @desc    Get user reviews
// @route   GET /api/user/reviews
// @access  Private
const getUserReviews = async (req, res) => {
    const reviews = await Review.find({ user: req.user._id }).populate('listing', 'title');
    res.json(reviews);
};

// @desc    Get user messages
// @route   GET /api/user/messages
// @access  Private
const getUserMessages = async (req, res) => {
    const messages = await Message.find({
        $or: [{ recipient: req.user._id }, { sender: req.user._id }],
    })
        .populate('sender', 'username')
        .populate('recipient', 'username')
        .sort({ createdAt: -1 });
    res.json(messages);
};

module.exports = {
    getUserReviews,
    getUserMessages,
};
