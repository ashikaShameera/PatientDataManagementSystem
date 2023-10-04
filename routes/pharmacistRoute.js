const express = require('express');
const router = express.Router();

const pharmacistControl=require('../controllers/pharmacistControl');
const catchAsync=require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');

router.route('/register')                 //To render registation form
    .post(catchAsync(pharmacistControl.registerPharmarcist)) 

module.exports=router