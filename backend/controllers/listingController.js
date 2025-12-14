const Listing = require('../models/Listing');

// @desc    Get all listings with pagination
// @route   GET /api/listings
// @access  Public
const getListings = async (req, res) => {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const count = await Listing.countDocuments({});
    const listings = await Listing.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({
        listings,
        page,
        pages: Math.ceil(count / pageSize),
        total: count,
    });
};

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
const getListingById = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (listing) {
        res.status(200).json(listing);
    } else {
        res.status(404).json({ message: 'Listing not found' });
    }
};

// @desc    Create a listing
// @route   POST /api/listings
// @access  Private
const createListing = async (req, res) => {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
        res.status(400).json({ message: 'Please add all fields' });
        return;
    }

    let images = [];
    if (req.files) {
        images = req.files.map((file) => file.path);
    }

    const listing = new Listing({
        title,
        description,
        price,
        images,
        user: req.user._id,
    });

    const createdListing = await listing.save();
    res.status(201).json(createdListing);
};

// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private
const updateListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (listing) {
        if (listing.user.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        listing.title = req.body.title || listing.title;
        listing.description = req.body.description || listing.description;
        listing.price = req.body.price || listing.price;

        if (req.files && req.files.length > 0) {
            const newImages = req.files.map((file) => file.path);
            listing.images = [...listing.images, ...newImages];
        }

        const updatedListing = await listing.save();
        res.status(200).json(updatedListing);
    } else {
        res.status(404).json({ message: 'Listing not found' });
    }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private
const deleteListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (listing) {
        if (listing.user.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        await Listing.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Listing removed' });
    } else {
        res.status(404).json({ message: 'Listing not found' });
    }
};

// @desc    Search listings with filters
// @route   GET /api/listings/search
// @access  Public
const searchListings = async (req, res) => {
    try {
        const {
            lat,
            lng,
            dist,
            checkIn,
            checkOut,
            minPrice,
            maxPrice,
            guests,
            amenities,
            q,
        } = req.query;

        let query = {};

        // Text Search
        if (q) {
            query.$text = { $search: q };
        }

        // Geo Search
        if (lat && lng) {
            query.location = {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(lng), parseFloat(lat)],
                    },
                    $maxDistance: (parseInt(dist) || 10) * 1000, // Default 10km
                },
            };
        }

        // Price Range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseInt(minPrice);
            if (maxPrice) query.price.$lte = parseInt(maxPrice);
        }

        // Guests
        if (guests) {
            query.guests = { $gte: parseInt(guests) };
        }

        // Amenities
        if (amenities) {
            const amenitiesArray = amenities.split(',');
            query.amenities = { $all: amenitiesArray };
        }

        // Date Availability (Basic Overlap Check)
        if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);

            query.unavailableDates = {
                $not: {
                    $elemMatch: {
                        $or: [
                            { start: { $lt: end }, end: { $gt: start } }, // Overlap condition
                        ],
                    },
                },
            };
        }

        const listings = await Listing.find(query);
        res.json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getListings,
    getListingById,
    createListing,
    updateListing,
    deleteListing,
    searchListings,
};
