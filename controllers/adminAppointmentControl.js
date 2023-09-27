const Appointment = require('../models/appointment');
const Doctor = require('../models/doctor');
const Patient = require("../models/patient");

const { searchDoctorsAdmin, searchDoctorById } = require('./searchController');

//render appointment page in admin panel
module.exports.renderAppointmentPage = async (req, res) => {
    // Fetch all appointments
    const appointments = await Appointment.find();
    // Render the appointment.ejs template with the appointments data
    res.render("admin/appointment", { appointments });
}


//render appointment creation page in admin panel
module.exports.renderAppointmentCreationPage = async (req, res) => {
    const doctors = [];
    res.render("admin/appointment/create", { doctors });
}

//Use for to get doctor data by admin for make an appointmenet
module.exports.getDoctorDetails = async (req, res) => {
    const id = req.params.id;
    const { selectType, DoctorSearchInput } = req.body;

    const doctors = await searchDoctorsAdmin(selectType, DoctorSearchInput);       //calling the searchDoctors

    if (doctors) {

        res.render(`admin/appointment/create`, { doctors });
    } else {
        res.status(404).send('Doctor Not Found');
    }

}



//this will fill the form which appointment need to update
module.exports.fillUpdateForm = async (req, res) => {
    const id = req.params.id;
    const appointment = await Appointment.findById(id);
    res.render('admin/appointment/edit', { appointment })
}





//this will update appointment according to id if doctor is available...
// Controller to update an appointment
exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        // Assuming your form data is submitted as JSON
        const updatedAppointmentData = req.body.appointment;

        // Find and update the appointment by ID
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, updatedAppointmentData, {
            new: true, // Return the updated document
            runValidators: true, // Validate the updated data
        });

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.redirect('/admin/appointment'); // Redirect to the appointment list page or handle as needed
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).send('An error occurred.');
    }
};









//create new Appointment
module.exports.createNewAppointment = async (req, res) => {
    try {
        // Retrieve the input values from the form
        const { date, time, roomNumber, maximumPatients } = req.body.appointment;
        const mail = req.body.search_field;
        // Find the doctor by NIC
        const doctor = await Doctor.findOne({ email: mail });
        console.log(date);
        // console.log("doctor id (outside if):" + doctor._id);
        // console.log("doctor nic (outside if)" + doctor.nic);

        if (!doctor) {
            // Handle the case where the doctor is not found
            return res.status(404).send('Doctor not found.');
        } else {
            console.log("doctor id :" + doctor._id);
            console.log("doctor nic :" + doctor.nic);
            // Create a new appointment for the found doctor
            const appointment = new Appointment({
                doctor: doctor._id,
                date,
                time,
                roomNumber,
                maximumPatients,
            });

            await appointment.save();

            // Redirect to the relevant page after successful appointment creation
            return res.redirect('/admin/appointment');
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).send('An error occurred.');
    }
}

//delete appointment
module.exports.deleteAppointment = async (req, res) => {

    const appointmentId = req.params.id;
    console.log(`appointment id : ${appointmentId}`);
    try {

        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
        console.log(`deleted appointement ${deletedAppointment}`);
        // Check if the appointment was found and deleted
        if (!deletedAppointment) {
            res.redirect('/admin/appointment');
        }

        // Return a success message or appropriate response
        return res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
