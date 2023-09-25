const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const Patient = require("../models/patient");

const { searchDoctorsAdmin, searchDoctorById } = require('./searchController');

//render appointment page in admin panel
module.exports.renderNewAppointmentForm = (req, res) => {
    res.render("admin/appointment");
}



//create new
module.exports.createNewAppointment = async (req, res) => {
    try {
        const nic = req.body.nic;

        // Find the doctor by NIC
        const doctor = await Doctor.findOne(nic);

        if (!doctor) {
            // Handle the case where the doctor is not found
            return res.status(404).send('Doctor not found.');
        }

        // Create the appointment using the other fields in req.body.appointment
        const appointment = new Appointment(req.body.appointment);
        // Associate the appointment with the found doctor
        appointment.doctor = doctor._id;
        await appointment.save();

        // Redirect to the relevant page after successful appointment creation
        return res.redirect('/admin/appointment');

    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).send('An error occurred.');
    }
}


//This will get all the appointments
module.exports.showAllAppointments = async (req, res) => {
    try {
        // Fetch all appointments
        const appointments = await Appointment.find();
        // Render the appointment.ejs template with the appointments data
        res.render('admin/appointment/index', { appointments });
    } catch (err) {
        console.error(err);
        // Handle errors appropriately
        res.status(500).send('An error occurred.');
    }
}
