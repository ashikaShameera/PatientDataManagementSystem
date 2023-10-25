const Patient = require("../models/patient");
const Doctor =require("../models/doctor");
const User = require("../models/user")
const Appointment=require("../models/appointment")
const AppointmentPatient = require('../models/appointmentPatients');
const paymentController = require('../controllers/paymentController');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const DiagnosticCardAndPrescriptionController=require('../controllers/DiagnosticCardAndPrescriptionController')
const {searchDoctors}=require('./searchController');

const currentDate = new Date();

module.exports.renderRegisterForm=(req,res)=>{ 
    res.render('patient/register',{ error: null })
}

module.exports.createPatient=async (req,res)=>{
   
    try {
        const patient = new Patient(req.body.patient);
        const saltRounds = 10; // Number of rounds (adjust as needed)
        const hashedPassword = await bcrypt.hash(patient.password, saltRounds);
        patient.password = hashedPassword
          await patient.save();
           // Create a new User with the hashed password and role 'Patient'
    const user = new User({
        email: patient.email,
        password: hashedPassword,
        role: "Patient",
        profile: patient._id
      });
  
      // Save the User to the database
      await user.save();
      const token = jwt.sign({ userId: user.profile._id }, 'your-secret-key', { expiresIn: '10h' });
    // Set the token as a cookie
        res.cookie('authToken', token, { httpOnly: true });
          // Redirect to the patient's profile or other appropriate page
          res.redirect(`/patient/${patient._id}`);
        } catch (error) {
            if (error.code === 11000) {
                // This error code (11000) indicates a duplicate key error
                // Handle the duplicate email or NIC error here
                res.status(400).render('patient/register', {
                    error: 'Email or NIC is already in use. Please choose a different one.',
                });
            } else {
                // Handle other errors (e.g., validation errors)
               // console.error('Error during registration:', error);
               res.status(400).render('patient/register', {
                error: 'Other error',
            });
            }
        }
}

module.exports.adminRegisterPatient=async(req,res)=>{
    try {
        const patient = new Patient(req.body.patient);
        if (req.validationError) {
            // If there is an validation error, handle it accordingly
            res.status(400).render('admin/patient', {
              patients: null,
              error: req.validationError, // Use the error message from the middleware
            });
          } else{
            // Generate a salt and hash the password
        const saltRounds = 10; // Number of rounds (adjust as needed)
        const hashedPassword = await bcrypt.hash(patient.password, saltRounds);
        patient.password = hashedPassword
        
           // Create a new User with the hashed password and role 'Patient'
    const user = new User({
        email: patient.email,
        password: hashedPassword,
        role: "Patient",
        profile: patient._id
      });
  
      // Save the User to the database
      await user.save();
      await patient.save();
          res.redirect(`/admin/patient`);
          }
        
        } catch (error) {
           if (error.code === 11000) {
                // Handle duplicate key error
                res.status(400).render('admin/patient', {
                  patients: null,
                  error: 'Email or NIC is already in use. Please choose a different one.',
                });
              } else {
                // Handle other errors
                res.status(400).render('admin/patient', {
                  patients: null,
                  error: 'Error occured during registration',
                });
              }
            }
          };
  

module.exports.showPatient=async(req,res)=>{
    const patientId=req.params.id;                     //Getting the patient id
    const patient=await Patient.findById(patientId);   //Get patient from database
    const encodedDoctor = req.query.doctor;     //Geting Doctor details from query parser

    let DiagnosticCardAndPrescriptions;

    //Getting upcomming Appointments
    let upcomingAppointments;
    
   try{
    upcomingAppointments=await AppointmentPatient.find({
        patient:patientId
    })
    .populate({
        path:'appointment',
        match: {
            date: { $gte: currentDate }, // Only include future appointments
          }
        }
        )
    .populate({
            path:'doctor'
    })
    .sort({ 'appointment.date': 1 });
   }
   catch(err){
    console.log(err);
   }
   console.log(upcomingAppointments)
    //Getting upcomming Appointments
   let pastAppointments;

   try{
        pastAppointments=await Appointment.find({
            patient:patientId
        })
        .populate({
            path:'appointment',
            match: {
                date: { $lt: currentDate }, // Only past future appointments
              }
            }
            )
        .populate({
                path:'doctor'
        })
        .sort({ 'appointment.date': -1 });
   }
   catch(err){
    console.log(err)
   }

    //Getting Prescription & Diagnostic Card
    try{
        DiagnosticCardAndPrescriptions=await DiagnosticCardAndPrescriptionController.getPrescription(patientId);
        DiagnosticCardAndPrescriptions = DiagnosticCardAndPrescriptions.slice().sort((a, b) => b.date - a.date);
     }catch(err){
        console.log(err);
     }

    if(encodedDoctor){
        const doctor = JSON.parse(decodeURIComponent(encodedDoctor));   //Put doctor to JSON object
        res.render('patient/show',{patient,doctor,DiagnosticCardAndPrescriptions,upcomingAppointments,pastAppointments});//In here parse the whole doctor object to front it can reduce it
    }
    else{
        let doctor;         //To send null object of doctor if not it gives ejs error
        res.render('patient/show',{patient,doctor,DiagnosticCardAndPrescriptions,upcomingAppointments,pastAppointments});  //Internal Medicine
    }            
}

//Use for to get doctor data by patient for make an appointmenet
module.exports.getDoctorDetails=async(req,res)=>{
    const id=req.params.id;
    const {selectType,DoctorSearchInput}=req.body;

    const doctors=await searchDoctors(selectType,DoctorSearchInput);       //calling the searchDoctors

    if(doctors){
        const encodedDoctor = encodeURIComponent(JSON.stringify(doctors));   //Encoding doctor for parse in url
        res.redirect(`/patient/${id}?doctor=${encodedDoctor}`);
    }else{
        res.redirect(`/patient/${id}`);
    }


 }

 //To get /:id/:doctorId/appointments
 module.exports.getDoctorsAppointments=async(req,res)=>{
    
    let appointments;
    const patientId=req.params.id;
    const doctorId=req.params.doctorId;

    //Get doctor
    const doctor=await Doctor.findById(doctorId);
    const patient=await Patient.findById(patientId);

    // Get the current date
    
    if(doctor && patient){
        appointments=await Appointment.find({
            doctor:doctorId,
            date: { $gt: currentDate }
        })
    }
    const paymentHash =await paymentController.initiatePayment()
    res.render('patient/showAppointments',{doctor,appointments,patient,paymentHash})
 }

//To Post /:id/:doctorId/appointments
 module.exports.makeTheAppointment=async (req,res)=>{

    const appointmentId=req.body.appointmentId
    const patientId=req.params.id;
    const doctorId=req.params.doctorId;

    //put patient to appointment object
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
          appointmentId,
          { $push: { patients: patientId } },
          { new: true }
        );
    
        if (!updatedAppointment) {
          console.log('Appointment not found');
          res.redirect (`/patient/${patientId}/${doctorId}/appointments`)
        }
    
        console.log('Patient added to the appointment:', updatedAppointment);
        
      } catch (error) {
        console.error('Error:', error);
        res.redirect (`/patient/${patientId}`)
      }

      //Put patient appointment into mapping collection
      const newAppointmentPatient = new AppointmentPatient({
        appointment: appointmentId, 
        patient: patientId, 
        doctor:doctorId
      });
      
      newAppointmentPatient.save();
      

    res.redirect (`/patient/${patientId}`)
 }

 



