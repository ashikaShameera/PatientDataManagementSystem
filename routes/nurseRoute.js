const express = require('express');
const router = express.Router();

const nurseControl=require('../controllers/nurseControl');
const catchAsync=require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');

router.route('/register')                 //To render registation form
    .post(catchAsync(nurseControl.registerNurse))         //To send registation post request

router.route('/:id')
    //.get(catchAsync(nurseControl.showDoctor))          //load when doctor login to system
    .put(catchAsync(nurseControl.updateNurse))
    //.delete(doctorControl.deleteDoctor);

module.exports=router