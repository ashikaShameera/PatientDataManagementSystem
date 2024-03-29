const express = require('express');
const router = express.Router();

const catchAsync=require('../utils/catchAsync');
const patientControl=require('../controllers/patientControl');

const {isValidatePatient}=require('../middleware');
const verifyAuthToken = require('../authMiddleware');

router.route('/')
    .post(verifyAuthToken,isValidatePatient,catchAsync(patientControl.createPatient)); //For creating patient in database
    //need to add joi validation here

router.route('/register')
    .get(patientControl.renderRegisterForm)      //rendering create patient form
    .post(isValidatePatient,catchAsync(patientControl.adminRegisterPatient))
    
router.route('/:id')
    .get(verifyAuthToken,catchAsync(patientControl.showPatient))


router.route('/:id/doctors')            
    .post(verifyAuthToken,catchAsync(patientControl.getDoctorDetails))      //This use to get doctor detals when user need to make appointment 

router.route('/:id/:doctorId/appointments')
    .get(verifyAuthToken,catchAsync(patientControl.getDoctorsAppointments))
    .post(verifyAuthToken,catchAsync(patientControl.makeTheAppointment))  //use to make an appointment

module.exports=router;