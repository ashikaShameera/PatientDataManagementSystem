const express = require('express');
const router = express.Router();
const auth = require('../authMiddleware')
const userControl = require('../controllers/userControl');
const catchAsync = require('../utils/catchAsync');

// GET request to render the login page
router.get('/login',userControl.renderLogin);

// POST request to handle login form submission
router.post('/login', userControl.handleLogin); // Define handleLogin function in your userControl

router.get('/logout',userControl.handleLogout)

module.exports = router;
