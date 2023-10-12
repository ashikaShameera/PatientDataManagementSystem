const express = require('express');
const router = express.Router();

const pharmacistControl=require('../controllers/pharmacistControl');
const catchAsync=require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');
const { isValidatePharmacist } = require('../middleware');

router.route('/register')                 //To render registation form
    .post(isValidatePharmacist,catchAsync(pharmacistControl.registerPharmarcist)) 

router.route('/:id')
    .get(catchAsync(pharmacistControl.showPharmacist)) 

router.route('/:id/patients')
    .get(catchAsync(pharmacistControl.getPatientDetails))

router.route('/:id/patients/:patientId')
    .get(catchAsync(pharmacistControl.showPatientDetails))


module.exports=router