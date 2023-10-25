const express = require('express');
const router = express.Router();
const auth = require('../authMiddleware')
const userControl = require('../controllers/userControl');
const catchAsync = require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');

// GET request to render the login page
router.get('/login',userControl.renderLogin);

// POST request to handle login form submission
router.post('/login',userControl.handleLogin); // Define handleLogin function in your userControl

router.get('/logout',verifyAuthToken,userControl.handleLogout)

router.get('/reset-password', verifyAuthToken,userControl.renderResetPassword);

router.post('/reset-password',verifyAuthToken,userControl.handleResetPassword)

module.exports = router;
