const express = require('express');
const router = express.Router();

const nurseControl=require('../controllers/nurseControl');
const catchAsync=require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');

router.route('/register')                
    .post(catchAsync(nurseControl.registerNurse))       

router.route('/:id')
    .get(catchAsync(nurseControl.showNurse))         

router.route('/:id/patients')
    .get(catchAsync(nurseControl.getPatientDetails))

router.route('/:id/patients/:patientId')
    .get(catchAsync(nurseControl.showPatientDetails))

module.exports=router