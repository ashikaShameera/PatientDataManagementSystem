//you must require admin module

const doctor = require("../models/doctor");
const Doctor = require("../models/doctor");
const Nurse = require("../models/nurse");
const User = require("../models/user");
const Pharmacist = require("../models/pharmacist");
const Appointment = require("../models/appointment");
const Patient = require("../models/patient");
const Insurer = require("../models/insurer");
const searchController = require("./searchController");

module.exports.renderAdminHomePage = async (req, res) => {
  const totalPatients = await Patient.countDocuments();
  const totalDoctors = await Doctor.countDocuments();
  const totalNurses = await Nurse.countDocuments();
  const totalInsurers = await Insurer.countDocuments();
  const totalAppoinments = await Appointment.countDocuments();
  const today = new Date();
  const totalFutureAppoinments = await Appointment.countDocuments({
    date: { $gt: today },
  });
  const doctors = await Doctor.find();
  res.render("admin/home", {
    totalPatients,
    totalDoctors,
    totalNurses,
    totalAppoinments,
    totalInsurers,
    totalFutureAppoinments,
    doctors,
  });
};

//Patient Related Things
module.exports.renderAdminPatientPage = async (req, res) => {
  let patients;

  let PatientSearchInput = req.query.PatientSearchInput;

  if (PatientSearchInput) {
    PatientSearchInput = PatientSearchInput.trim();
  }

  patients = await searchController.searchPatient(PatientSearchInput);

  if (patients.length <= 0) patients = await Patient.find();

  res.render("admin/patient", { patients, error: null });
};

module.exports.showPatient = async (req, res) => {
  const id = req.params.id;
  const patient = await Patient.findById(id);
  res.render("admin/patient/edit", { patient, error: null }); // Update the view path
};

module.exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body.patient;
    const patient = await Patient.findByIdAndUpdate(id, req.body.patient);
    if (req.validationError) {
      // If there is an validation error , handle it accordingly
      res.status(400).render("admin/patient/edit", {
        patient,
        error: req.validationError, // Use the error message from the middleware
      });
    } else {
      const user = await User.findOne({ profile: patient._id });
      user.email = email;
      await patient.save();
      await user.save();

      res.redirect(`/admin/patient`);
    } // Update the redirect path
  } catch (error) {
    res.status(400).redirect("admin/patient/edit", {
      error: "Error occured during update",
    });
  }
};

module.exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteOne({ profile: id });
    await Patient.findByIdAndDelete(id);

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting Patient:", error);
    res.status(500).json({ error: "Failed to delete Patient" });
  }
};

//Doctor Related Things

module.exports.renderAdminDoctorPage = async (req, res) => {
  let doctors;

  const selectType = req.query.selectType;
  let DoctorSearchInput = req.query.DoctorSearchInput;

  if (DoctorSearchInput) DoctorSearchInput = DoctorSearchInput.trim();

  doctors = await searchController.searchDoctorsAdmin(
    selectType,
    DoctorSearchInput
  ); //Internal Medicine

  if (doctors.length <= 0) {
    doctors = await Doctor.find();
  }
  module.exports.doctors = doctors;
  res.render("admin/doctor", { doctors, error: null });
};

module.exports.showDoctor = async (req, res) => {
  const id = req.params.id;
  const doctor = await Doctor.findById(id);
  res.render("admin/doctor/edit", { doctor });
};

module.exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body.doctor;
  const doctor = await Doctor.findByIdAndUpdate(id, req.body.doctor);
  const user = await User.findOne({ profile: doctor._id });
  user.email = email;
  await doctor.save();
  await user.save();

  res.redirect(`/admin/doctor`);
};

module.exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteOne({ profile: id });
    await Doctor.findByIdAndDelete(id);
    // Redirect to the nurse list page or send a success response
    res.json({ success: true });
  } catch (error) {
    // Handle any errors and send an error response
    console.error("Error deleting Doctor:", error);
    res.status(500).json({ error: "Failed to delete Doctor" });
  }
};

//Nurse Related Things
module.exports.renderAdminNursePage = async (req, res) => {
  let nurses;

  let NurseSearchInput = req.query.NurseSearchInput;

  if (NurseSearchInput) NurseSearchInput = NurseSearchInput.trim();

  nurses = await searchController.searchNurse(NurseSearchInput);

  if (nurses.length <= 0) {
    nurses = await Nurse.find();
  }
  res.render("admin/nurse/nurse", { nurses, error: null });
};

module.exports.showNurse = async (req, res) => {
  const id = req.params.id;
  const nurse = await Nurse.findById(id);
  res.render("admin/nurse/edit", { nurse });
};

module.exports.updateNurse = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body.nurse;
  const nurse = await Nurse.findByIdAndUpdate(id, req.body.nurse);
  const user = await User.findOne({ profile: nurse._id });
  user.email = email;
  await nurse.save();
  await user.save();

  res.redirect(`/admin/nurse`);
};

module.exports.deleteNurse = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await User.deleteOne({ profile: id });
    await Nurse.findByIdAndDelete(id);
    // Redirect to the nurse list page or send a success response
    res.json({ success: true });
  } catch (error) {
    // Handle any errors and send an error response
    console.error("Error deleting nurse:", error);
    res.status(500).json({ error: "Failed to delete nurse" });
  }
};

//pharmacist related things

module.exports.renderAdminPharmacistPage = async (req, res) => {
  let pharmacists;
  let PharmacistSearchInput = req.query.PharmacistSearchInput;

  if (PharmacistSearchInput)
    PharmacistSearchInput = PharmacistSearchInput.trim();

  pharmacists = await searchController.searchPharmacist(PharmacistSearchInput);

  if (pharmacists.length <= 0) {
    pharmacists = await Pharmacist.find();
  }

  res.render("admin/pharmacist/pharmacist", { pharmacists, error: null });
};

module.exports.showPharmacist = async (req, res) => {
  const id = req.params.id;
  const pharmacist = await Pharmacist.findById(id);
  res.render("admin/pharmacist/edit", { pharmacist });
};

module.exports.updatePharmacist = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body.pharmacist;
  const pharmacist = await Pharmacist.findByIdAndUpdate(
    id,
    req.body.pharmacist
  );
  const user = await User.findOne({ profile: pharmacist._id });
  user.email = email;
  await pharmacist.save();
  await user.save();

  res.redirect(`/admin/pharmacist`);
};

module.exports.deletePharmacist = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await User.deleteOne({ profile: id });
    await Pharmacist.findByIdAndDelete(id);

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting pharmacist:", error);
    res.status(500).json({ error: "Failed to delete pharmacist" });
  }
};
//Insurer related things

module.exports.renderAdminInsurerPage = async (req, res) => {
  let insurers;
  let InsurerSearchInput = req.query.InsurerSearchInput;

  if (InsurerSearchInput) InsurerSearchInput = InsurerSearchInput.trim();

  insurers = await searchController.searchInsurer(InsurerSearchInput);

  if (insurers.length <= 0) {
    insurers = await Insurer.find();
  }

  res.render("admin/insurer/insurer", { insurers, error: null });
};

module.exports.showInsurer = async (req, res) => {
  const id = req.params.id;
  const insurer = await Insurer.findById(id);
  res.render("admin/insurer/edit", { insurer });
};

module.exports.updateInsurer = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body.insurer;
  const insurer = await Insurer.findByIdAndUpdate(id, req.body.insurer);
  const user = await User.findOne({ profile: insurer._id });
  user.email = email;
  await insurer.save();
  await user.save();

  res.redirect(`/admin/insurer`);
};

module.exports.deleteInsurer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await User.deleteOne({ profile: id });
    await Insurer.findByIdAndDelete(id);
    // Redirect to the insurer list page or send a success response
    res.json({ success: true });
  } catch (error) {
    // Handle any errors and send an error response
    console.error("Error deleting insurer:", error);
    res.status(500).json({ error: "Failed to delete insurer" });
  }
};
