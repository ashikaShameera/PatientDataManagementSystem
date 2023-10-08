const express = require('express');
const router = express.Router();

const nurseControl=require('../controllers/nurseControl');
const catchAsync=require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');

router.route('/register')                 //To render registation form
    .post(catchAsync(nurseControl.registerNurse))         //To send registation post request

router.route('/:id')
    .get(catchAsync(nurseControl.showNurse))          //load when doctor login to system
    .put(catchAsync(nurseControl.updateNurse))
    //.delete(doctorControl.deleteDoctor);

router.route('/:id/patients')
    .get(catchAsync(nurseControl.getPatientDetails))

router.route('/:id/patients/:patientId')
    .get(catchAsync(nurseControl.showPatientDetails))


module.exports=router