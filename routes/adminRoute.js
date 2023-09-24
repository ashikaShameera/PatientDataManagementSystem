const express = require('express');
const router = express.Router();

const adminControl=require('../controllers/adminControl');
const doctorControl=require('../controllers/doctorControl')

const catchAsync=require('../utils/catchAsync');

router.route('/')
    .get(adminControl.renderAdminHomePage)  //must handle async error handler

router.route('/doctor')
    .get(adminControl.renderAdminDoctorPage)

router.route('/doctor/:id')
    .get(catchAsync(adminControl.showDoctor))
    .put(catchAsync(adminControl.updateDoctor))

router.route('/appointment')
    .get(adminControl.renderAppointmentPage)

router.route('/patient')
    .get(adminControl.renderAdminPatientPage);

module.exports=router;