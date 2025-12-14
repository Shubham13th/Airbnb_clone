const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        content: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
