const express = require('express');
const router = express.Router();

const patientControl=require('../controllers/patientControl');

router.route('/')
    .get(patientControl.index)
    .post(patientControl.createPatient); //For creating patient in database

router.route('/new').get(patientControl.renderNewForm)      //rendering create patient form

router.route('/:id')
    .get(patientControl.showPatient)



module.exports=router;