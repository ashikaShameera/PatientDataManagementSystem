const express = require('express');
const router = express.Router();

const catchAsync=require('../utils/catchAsync');
const patientControl=require('../controllers/patientControl');

const {isValidatePatient}=require('../middleware');
const verifyAuthToken = require('../authMiddleware');

router.route('/')
    .get(patientControl.index)
    .post(isValidatePatient,catchAsync(patientControl.createPatient)); //For creating patient in database
    //need to add joi validation here

router.route('/register')
    .get(patientControl.renderRegisterForm)      //rendering create patient form
    .post(patientControl.adminRegisterPatient)
    
router.route('/:id')
    .get(catchAsync(patientControl.showPatient))


router.route('/:id/doctors')            
    .post(catchAsync(patientControl.getDoctorDetails))      //This use to get doctor detals when user need to make appointment 

module.exports=router;