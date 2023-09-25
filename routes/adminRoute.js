const express = require('express');
const router = express.Router();

const adminControl = require('../controllers/adminControl');
const doctorControl = require('../controllers/doctorControl');
const adminAppointmentControl = require('../controllers/adminAppointmentControl');

const catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(adminControl.renderAdminHomePage)  //must handle async error handler

router.route('/doctor')
    .get(adminControl.renderAdminDoctorPage)

// router.route('/appointment')
//     .get(adminControl.renderAppointmentPage)

router.route('/doctor/all')
    .get(doctorControl.showAllDoctors)

router.route('/patient')
    .get(adminControl.renderAdminPatientPage);


//render appointment page
router.route('/appointment')
    .get(adminAppointmentControl.renderNewAppointmentForm)

router.route('/appointment')
    .post(adminAppointmentControl.renderNewAppointmentForm)

router.route('/appointment/new')
    .post(catchAsync(adminAppointmentControl.createNewAppointment))

router.route('/appointment/all')
    .post(catchAsync(adminAppointmentControl.showAllAppointments))

module.exports = router;