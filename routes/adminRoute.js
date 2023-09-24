const express = require('express');
const router = express.Router();

const adminControl=require('../controllers/adminControl');
const doctorControl=require('../controllers/doctorControl')

const catchAsync=require('../utils/catchAsync');

router.route('/')
    .get(adminControl.renderAdminHomePage)  //must handle async error handler

router.route('/doctor')
    .get(adminControl.renderAdminDoctorPage)

router.route('/doctor/all')
    .get(doctorControl.showAllDoctors)

router.route('/patient')
    .get(adminControl.renderAdminPatientPage);

module.exports=router;