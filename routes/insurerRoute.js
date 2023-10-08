const express = require('express');
const router = express.Router();

const insurerControl=require('../controllers/insurerControl');
const catchAsync=require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');

router.route('/register')                 //To render registation form
    .post(catchAsync(insurerControl.registerInsurer))         //To send registation post request

module.exports=router