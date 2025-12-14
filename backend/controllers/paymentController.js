const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payments/create-order
// @access  Private
const createOrder = async (req, res) => {
    const { bookingId } = req.body;

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const options = {
            amount: booking.totalPrice * 100, // amount in the smallest currency unit (paise)
            currency: 'INR',
            receipt: `receipt_${bookingId}`,
            notes: {
                bookingId: bookingId,
            },
        };

        const order = await razorpay.orders.create(options);

        // Save the order ID to the booking if needed, or just return it
        res.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: 'Something went wrong while creating order' });
    }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // Payment successful, update booking status
        try {
            await Booking.findByIdAndUpdate(bookingId, {
                status: 'confirmed',
                paymentStatus: 'paid',
                paymentId: razorpay_payment_id,
            });

            res.json({ success: true, message: 'Payment verified successfully' });
        } catch (error) {
            console.error('Error updating booking:', error);
            res.status(500).json({ success: false, message: 'Payment verified but failed to update booking' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
};

module.exports = {
    createOrder,
    verifyPayment,
};
