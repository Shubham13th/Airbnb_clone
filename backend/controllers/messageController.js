const Message = require('../models/Message');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
    const { recipientId, content } = req.body;
    const senderId = req.user._id;

    try {
        const message = await Message.create({
            sender: senderId,
            recipient: recipientId,
            content,
        });

        const fullMessage = await Message.findById(message._id)
            .populate('sender', 'username email')
            .populate('recipient', 'username email');

        // Socket.io Emit
        const io = req.app.get('io');
        io.to(recipientId).emit('new_message', fullMessage);

        // Email Notification
        const recipient = await User.findById(recipientId);
        if (recipient && recipient.email) {
            await sendEmail({
                to: recipient.email,
                subject: `New message from ${req.user.username}`,
                text: `You have received a new message: "${content}"`,
                html: `<p>You have received a new message from <strong>${req.user.username}</strong>:</p><p>"${content}"</p>`,
            });
        }

        res.status(201).json(fullMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get conversation with a user
// @route   GET /api/messages/:userId
// @access  Private
const getConversation = async (req, res) => {
    const otherUserId = req.params.userId;
    const currentUserId = req.user._id;

    try {
        const messages = await Message.find({
            $or: [
                { sender: currentUserId, recipient: otherUserId },
                { sender: otherUserId, recipient: currentUserId },
            ],
        })
            .sort({ createdAt: 1 })
            .populate('sender', 'username')
            .populate('recipient', 'username');

        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    sendMessage,
    getConversation,
};
