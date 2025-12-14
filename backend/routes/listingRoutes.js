const express = require('express');
const router = express.Router();
const {
    getListings,
    getListingById,
    createListing,
    updateListing,
    deleteListing,
    searchListings,
} = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.get('/search', searchListings);
router.route('/').get(getListings).post(protect, upload.array('images'), createListing);
router
    .route('/:id')
    .get(getListingById)
    .put(protect, upload.array('images'), updateListing)
    .delete(protect, deleteListing);

module.exports = router;
