const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const searchController = require("./searchController");

const { searchDoctorsAdmin, searchDoctorById } = require("./searchController");

//get local date
const currentDate = new Date();

//render appointment page in admin panel
module.exports.renderAppointmentPage = async (req, res) => {
  try {
    let appointments, upcomingAppointments, pastAppointments;
    let patients, doctors;

    let selectQuery = req.query.appointmentSearchInput;
    const selectType = req.query.selectType;
    if (selectQuery) {
      selectQuery = selectQuery;
    }

    if (selectType === "Doctor") {
      doctors = await searchController.searchDoctorInAppointment(selectQuery);
      console.log("doctor :" + doctors);
      // Search appointments based on the found doctors
      if (doctors && doctors.length > 0) {
        appointments = await Appointment.find({
          doctor: { $in: doctors.map((doctor) => doctor._id) },
        }).populate({ path: "doctor" });
      }
    } else if (selectType === "Patient") {
      // Search appointments based on the found patients
      patients = await searchController.searchPatient(selectQuery);
      console.log("Patients :" + patients);
      if (patients && patients.length > 0) {
        appointments = await Appointment.find({
          patients: { $in: patients.map((patient) => patient._id) },
        }).populate({ path: "doctor" });
      }
    } else {
      // If no search type specified, fetch all appointments
      appointments = await Appointment.find().populate({ path: "doctor" });
    }
    console.log("appoimnets" + appointments);

    // Separate appointments into upcoming and past appointments
    if (appointments) {
      upcomingAppointments = appointments.filter(
        (appointment) => appointment.date >= currentDate
      );
      pastAppointments = appointments.filter(
        (appointment) => appointment.date < currentDate
      );
    } else {
      // Handle the case where appointments is undefined (e.g., no appointments found)
      upcomingAppointments = [];
      pastAppointments = [];
    }

    res.render("admin/appointment", {
      appointments,
      upcomingAppointments,
      pastAppointments,
    });
  } catch (err) {
    console.log(err);
  }
};

//render appointment creation page in admin panel
module.exports.renderAppointmentCreationPage = async (req, res) => {
  const doctors = [];
  res.render("admin/appointment/create", { doctors });
};

//Use for to get doctor data by admin for make an appointmenet
module.exports.getDoctorDetails = async (req, res) => {
  const id = req.params.id;
  const { selectType, DoctorSearchInput } = req.body;

  const doctors = await searchDoctorsAdmin(selectType, DoctorSearchInput); //calling the searchDoctors

  if (doctors) {
    res.render(`admin/appointment/create`, { doctors });
  } else {
    res.status(404).send("Doctor Not Found");
  }
};

//this will fill the form which appointment need to update
module.exports.fillUpdateForm = async (req, res) => {
  const id = req.params.id;
  const appointment = await Appointment.findById(id);
  res.render("admin/appointment/edit", { appointment });
};

//this will update appointment according to id if doctor is available...
// Controller to update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming your form data is submitted as JSON
    const updatedAppointmentData = req.body.appointment;

    // Find and update the appointment by ID
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updatedAppointmentData,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the updated data
      }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.redirect("/admin/appointment"); // Redirect to the appointment list page or handle as needed
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).send("An error occurred.");
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
      return res.status(404).send("Doctor not found.");
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
      return res.redirect("/admin/appointment");
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).send("An error occurred.");
  }
};

//delete appointment
module.exports.deleteAppointment = async (req, res) => {
<<<<<<< HEAD

    const appointmentId = req.params.id;
    console.log(`appointment id : ${appointmentId}`);
    try {

        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
        console.log(`deleted appointement ${deletedAppointment}`);
        // Check if the appointment was found and deleted
        if (!deletedAppointment) {
            res.render('/admin/appointment');
        }

        // Return a success message or appropriate response
        return res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
=======
  const appointmentId = req.params.id;
  console.log(`appointment id : ${appointmentId}`);
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );
    console.log(`deleted appointement ${deletedAppointment}`);
    // Check if the appointment was found and deleted
    if (!deletedAppointment) {
      res.redirect("/admin/appointment");
>>>>>>> 40c5dfd91d53484191665d501627a0f603b96be1
    }

    // Return a success message or appropriate response
    return res
      .status(200)
      .json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
