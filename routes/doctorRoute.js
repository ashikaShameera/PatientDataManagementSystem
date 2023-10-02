const express = require('express');
const router = express.Router();

const doctorControl=require('../controllers/doctorControl');
const catchAsync=require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');

router.route('/register')
    .get(doctorControl.renderRegisterForm)                  //To render registation form
    .post(catchAsync(doctorControl.registerDoctor))         //To send registation post request

router.route('/:id')
    .get(verifyAuthToken,catchAsync(doctorControl.showDoctor))          //load when doctor login to system
    .put(catchAsync(doctorControl.updateDoctor))
    .delete(doctorControl.deleteDoctor);

router.route('/:id/edit')   
    .get(doctorControl.renderEditForm) 

router.route('/:id/patients')
    .get(catchAsync(doctorControl.getPatientDetails))

router.route('/:id/patients/:patientId')
    .get(catchAsync(doctorControl.showPatientDetails))
    .post(catchAsync(doctorControl.addDiagnosticCardAndPrescription))

module.exports=router;