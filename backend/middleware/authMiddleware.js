const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // console.log("Token received:", token.substring(0, 10) + "..."); 
            // console.log("Secret exists:", !!process.env.JWT_SECRET); 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Not authorized, token expired' });
            }
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
