const mongoose = require('mongoose');

const listingSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        images: {
            type: [String],
            default: [],
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                index: '2dsphere',
            },
        },
        amenities: {
            type: [String],
            default: [],
        },
        guests: {
            type: Number,
            default: 1,
        },
        unavailableDates: [
            {
                start: { type: Date },
                end: { type: Date },
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

listingSchema.index({ title: 'text', description: 'text' });
listingSchema.index({ price: 1 });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
