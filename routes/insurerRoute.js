const express = require('express');
const router = express.Router();

const insurerControl=require('../controllers/insurerControl');
const catchAsync=require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');
const { isValidateInsurer } = require('../middleware');

router.route('/register')                 //To render registation form
    .post(isValidateInsurer,catchAsync(insurerControl.registerInsurer))         //To send registation post request

router.route('/:id')
    .get(catchAsync(insurerControl.showInsurer)) 

router.route('/:id/patients')
    .get(catchAsync(insurerControl.getPatientDetails))

router.route('/:id/patients/:patientId')
    .get(catchAsync(insurerControl.showPatientDetails))


    module.exports=router