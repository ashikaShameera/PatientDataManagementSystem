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

router.route('/doctor/:id')
    .get(catchAsync(adminControl.showDoctor))
    .put(catchAsync(adminControl.updateDoctor))

router.route('/patient')
    .get(adminControl.renderAdminPatientPage);


//------ Routes For the /admin/Appointment 


//render appointment page
router.route('/appointment')
    .get(adminAppointmentControl.renderAppointmentPage)

router.route('/appointment/create')
    .get(adminAppointmentControl.renderAppointmentCreationPage)

router.route('/appointment/findDoctor')
    .post(catchAsync(adminAppointmentControl.getDoctorDetails))//get doctor details when make an appointment

router.route('/appointment/:id')
    .get(catchAsync(adminAppointmentControl.fillUpdateForm))
    .delete(catchAsync(adminAppointmentControl.deleteAppointment))


//routes for the form submission
router.route('/appointment/new')
    .post(catchAsync(adminAppointmentControl.createNewAppointment))



router.put('/appointment/:id', adminAppointmentControl.updateAppointment)
module.exports = router;