const express = require('express');
const router = express.Router();

const catchAsync=require('../utils/catchAsync');
const patientControl=require('../controllers/patientControl');

const {isValidatePatient}=require('../middleware');

router.route('/')
    .get(patientControl.index)
    .post(catchAsync(patientControl.createPatient)); //For creating patient in database
    //need to add joi validation here

router.route('/new')
    .get(patientControl.renderNewForm)      //rendering create patient form

router.route('/:id')
    .get(catchAsync(patientControl.showPatient))


router.route('/:id/doctors')
    .post(catchAsync(patientControl.getDoctorDetails))



module.exports=router;