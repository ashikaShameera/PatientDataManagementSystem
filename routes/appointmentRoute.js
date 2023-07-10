const express = require('express');
const router = express.Router();

const appointmentControl=require('../controllers/appointmentControl');
const catchAsync=require('../utils/catchAsync')

router.route('/')
    .post(appointmentControl.createAppointment);

router.route('/new')
    .get(appointmentControl.renderAppointmentDoctorSearchForm)
    .post(catchAsync(appointmentControl.getDoctorDetails))

router.route('/new/:id')
    .get(catchAsync(appointmentControl.renderNewAppointmentForm))    

module.exports=router;