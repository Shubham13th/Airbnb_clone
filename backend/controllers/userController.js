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

// @desc    Update user to host
// @route   POST /api/user/become-host
// @access  Private
const becomeHost = async (req, res) => {
    const user = await req.user;

    if (user) {
        user.role = 'host';
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    getUserReviews,
    getUserMessages,
    becomeHost,
};
