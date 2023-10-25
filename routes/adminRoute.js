const express = require('express');
const router = express.Router();

const adminControl = require('../controllers/adminControl');
const doctorControl = require('../controllers/doctorControl');
const adminAppointmentControl = require('../controllers/adminAppointmentControl');
const catchAsync = require('../utils/catchAsync');
const verifyAuthToken = require('../authMiddleware');
const middleware = require('../middleware')

router.route('/')
    .get(verifyAuthToken,adminControl.renderAdminHomePage)  //must handle async error handler

router.route('/doctor')
    .get(verifyAuthToken,adminControl.renderAdminDoctorPage)

router.route('/doctor/:id')
    .get(verifyAuthToken,catchAsync(adminControl.showDoctor))
    .put(verifyAuthToken,middleware.isValidateDoctor,catchAsync(adminControl.updateDoctor))
    .delete(verifyAuthToken,catchAsync(adminControl.deleteDoctor))

router.route('/patient')
    .get(verifyAuthToken,adminControl.renderAdminPatientPage);

router.route('/patient/:id')
    .get(verifyAuthToken,catchAsync(adminControl.showPatient))
    .put(verifyAuthToken,middleware.isValidatePatient,catchAsync(adminControl.updatePatient))
    .delete(verifyAuthToken,catchAsync(adminControl.deletePatient))

router.route('/nurse')
    .get(verifyAuthToken,catchAsync(adminControl.renderAdminNursePage))

router.route('/nurse/:id')
    .get(verifyAuthToken,catchAsync(adminControl.showNurse))
    .put(verifyAuthToken,middleware.isValidateNurse,catchAsync(adminControl.updateNurse))
    .delete(verifyAuthToken,catchAsync(adminControl.deleteNurse))

router.route('/pharmacist')
    .get(verifyAuthToken,catchAsync(adminControl.renderAdminPharmacistPage))

router.route('/pharmacist/:id')
    .get(verifyAuthToken,catchAsync(adminControl.showPharmacist))
    .put(verifyAuthToken,middleware.isValidatePharmacist,catchAsync(adminControl.updatePharmacist))
    .delete(verifyAuthToken,catchAsync(adminControl.deletePharmacist))

router.route('/insurer')
    .get(verifyAuthToken,catchAsync(adminControl.renderAdminInsurerPage));

router.route('/insurer/:id')
    .get(verifyAuthToken,catchAsync(adminControl.showInsurer))
    .put(verifyAuthToken,middleware.isValidateInsurer,catchAsync(adminControl.updateInsurer))
    .delete(verifyAuthToken,catchAsync(adminControl.deleteInsurer));


//------ Routes For the /admin/Appointment 


//render appointment page
router.route('/appointment')
    .get(verifyAuthToken,adminAppointmentControl.renderAppointmentPage)

router.route('/appointment/create')
    .get(verifyAuthToken,adminAppointmentControl.renderAppointmentCreationPage)

router.route('/appointment/findDoctor')
    .post(verifyAuthToken,verifyAuthToken,catchAsync(adminAppointmentControl.getDoctorDetails))//get doctor details when make an appointment

router.route('/appointment/:id')
    .get(verifyAuthToken,catchAsync(adminAppointmentControl.fillUpdateForm))
    .delete(verifyAuthToken,catchAsync(adminAppointmentControl.deleteAppointment))


//routes for the form submission
router.route('/appointment/new')
    .post(verifyAuthToken,catchAsync(adminAppointmentControl.createNewAppointment))



router.put('/appointment/:id', verifyAuthToken,adminAppointmentControl.updateAppointment)


module.exports = router;