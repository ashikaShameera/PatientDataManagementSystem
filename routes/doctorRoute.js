const express = require('express');
const router = express.Router();

const doctorControl=require('../controllers/doctorControl');
//const catchAsync=require('../utils/catchAsync');

router.route('/register')
    .get(doctorControl.renderRegister)          //To render registation form
    .post(doctorControl.registerDoctor)         //To send registation post request

module.exports=router;