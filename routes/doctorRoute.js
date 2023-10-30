const express = require('express');
const router = express.Router();

const doctorControl=require('../controllers/doctorControl');
const catchAsync=require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');
const { isValidateDoctor } = require('../middleware');

router.route('/register')
    .get(doctorControl.renderRegisterForm)                  //To render registation form
    .post(isValidateDoctor,catchAsync(doctorControl.registerDoctor))         //To send registation post request

router.route('/:id')
    .get(verifyAuthToken,catchAsync(doctorControl.showDoctor))          //load when doctor login to system
    .put(verifyAuthToken,catchAsync(doctorControl.updateDoctor))
    .delete(verifyAuthToken,doctorControl.deleteDoctor);

router.route('/:id/edit')   
    .get(verifyAuthToken,doctorControl.renderEditForm) 

router.route('/:id/patients')
    .get(verifyAuthToken,catchAsync(doctorControl.getPatientDetails))

router.route('/:id/patients/:patientId')
    .get(verifyAuthToken,catchAsync(doctorControl.showPatientDetails))
    .post(verifyAuthToken,catchAsync(doctorControl.addDiagnosticCardAndPrescription))

module.exports=router;