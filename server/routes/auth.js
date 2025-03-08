// Authentication routes
const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
], registerUser);

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
], loginUser);

module.exports = router;
