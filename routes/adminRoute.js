const express = require('express');
const router = express.Router();

const adminControl = require('../controllers/adminControl');
const doctorControl = require('../controllers/doctorControl');
const adminAppointmentControl = require('../controllers/adminAppointmentControl');
const catchAsync = require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');

router.route('/')
    .get(adminControl.renderAdminHomePage)  //must handle async error handler

router.route('/doctor')
    .get(adminControl.renderAdminDoctorPage)

router.route('/doctor/:id')
    .get(catchAsync(adminControl.showDoctor))
    .put(catchAsync(adminControl.updateDoctor))
    .delete(catchAsync(adminControl.deleteDoctor))

router.route('/patient')
    .get(adminControl.renderAdminPatientPage);

router.route('/patient/:id')
    .get(catchAsync(adminControl.showPatient))
    .put(catchAsync(adminControl.updatePatient))
    .delete(catchAsync(adminControl.deletePatient))

router.route('/nurse')
    .get(catchAsync(adminControl.renderAdminNursePage))

router.route('/nurse/:id')
    .get(catchAsync(adminControl.showNurse))
    .put(catchAsync(adminControl.updateNurse))
    .delete(catchAsync(adminControl.deleteNurse))

router.route('/pharmacist')
    .get(catchAsync(adminControl.renderAdminPharmacistPage))

router.route('/pharmacist/:id')
    .get(catchAsync(adminControl.showPharmacist))
    .put(catchAsync(adminControl.updatePharmacist))
    .delete(catchAsync(adminControl.deletePharmacist))

router.route('/insurer')
    .get(catchAsync(adminControl.renderAdminInsurerPage));

router.route('/insurer/:id')
    .get(catchAsync(adminControl.showInsurer))
    .put(catchAsync(adminControl.updateInsurer))
    .delete(catchAsync(adminControl.deleteInsurer));


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