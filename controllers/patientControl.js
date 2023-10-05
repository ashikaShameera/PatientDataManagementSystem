const Patient = require("../models/patient");
const Doctor =require("../models/doctor");
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const {searchDoctors}=require('./searchController');

module.exports.index=(req,res)=>{
    //This will use for search patient by doctor/reciption or admin
    res.render('patient/search')
}

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
                console.error('Error during registration:', error);
                res.status(500).render('error', { error: 'Registration failed' });
            }
        }
}

module.exports.adminRegisterPatient=async(req,res)=>{
    try {
        const patient = new Patient(req.body.patient);
        
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
        } catch (error) {
            if (error.code === 11000) {
                // This error code (11000) indicates a duplicate key error
                // Handle the duplicate email or NIC error here
                res.status(400).render('admin/patient', {patients:null,
                    error: 'Email or NIC is already in use. Please choose a different one.',
                });
            } else {
                // Handle other errors (e.g., validation errors)
                console.error('Error during registration:', error);
                res.status(500).render('error', { error: 'Registration failed' });
            }
        }   
   }
  

module.exports.showPatient=async(req,res)=>{
    const id=req.params.id;                     //Getting the patient id
    const patient=await Patient.findById(id);   //Get patient from database
    const encodedDoctor = req.query.doctor;     //Geting Doctor details from query parser

    if(encodedDoctor){
        const doctor = JSON.parse(decodeURIComponent(encodedDoctor));   //Put doctor to JSON object
        res.render('patient/show',{patient,doctor,error:null});//In here parse the whole doctor object to front it can reduce it
    }
    else{
        let doctor;         //To send null object of doctor if not it gives ejs error
        res.render('patient/show',{patient,doctor,error:null});  //Internal Medicine
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

 



