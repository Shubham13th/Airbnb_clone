const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate Access Token (Short Lived)
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
};

// Generate Refresh Token (Long Lived)
const generateRefreshToken = (res, userId) => {
    const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        username,
        email,
        password,
    });

    if (user) {
        generateRefreshToken(res, user._id);
        const accessToken = generateAccessToken(user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            accessToken,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateRefreshToken(res, user._id);
        const accessToken = generateAccessToken(user._id);
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            accessToken,
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (Cookie required)
const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Not authorized, no refresh token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const accessToken = generateAccessToken(decoded.userId);
        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
    };
    res.status(200).json(user);
};

module.exports = {
    registerUser,
    authUser,
    logoutUser,
    refreshAccessToken,
    getUserProfile,
};
