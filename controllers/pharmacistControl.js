const Pharmacist = require('../models/pharmacist')
const User = require('../models/user')
const Patient = require('../models/patient')
const bcrypt = require('bcrypt')
const {searchPatient}=require('../controllers/searchController');
const DiagnosticCardAndPrescriptionController=require('../controllers/DiagnosticCardAndPrescriptionController')

module.exports.registerPharmarcist=async(req,res)=>{
    try {
    const pharmacist=new Pharmacist(req.body.pharmacist); 
    if (req.validationError) {
      // If there is an validation error , handle it accordingly
      res.status(400).render('admin/pharmacist/pharmacist', {
        pharmacists: null,
        error: req.validationError, // Use the error message from the middleware
      });
    }else{  
    const saltRounds = 10; // Number of rounds (adjust as needed)
    const hashedPassword = await bcrypt.hash(pharmacist.password, saltRounds);
    pharmacist.password = hashedPassword   
    const user = new User({
        email: pharmacist.email,
        password: pharmacist.password,
        role: "Pharmacist",
        profile: pharmacist._id
      });       
    await user.save() 
    await pharmacist.save();          
    res.redirect(`/admin/pharmacist`);
}
    } catch (error) {
      if (error.code === 11000) {
         // This error code (11000) indicates a duplicate key error
         // Handle the duplicate email or NIC error here
         res.status(400).render('admin/pharmacist/pharmacist', { pharmacists:null,
             error: 'Email or NIC is already in use. Please choose a different one.',
         });
         
     } else {
      res.status(400).render('admin/pharmacist/pharmacist', {
        pharmacists: null,
        error: 'Error occured during registration',
      });
     }
    }
     
 }

 module.exports.showPharmacist = async (req, res) => {
    const id = req.params.id;
    const pharmacist = await Pharmacist.findById(id);
    const encodePatients = req.query.patients;
  
    if (encodePatients) {
      const patients = JSON.parse(decodeURIComponent(encodePatients));
      res.render('pharmacist/show', { pharmacist, patients });
    } else {
      let patients;
      res.render('pharmacist/show', { pharmacist, patients });
    }
  };
  
  module.exports.getPatientDetails = async (req, res) => {
    const id = req.params.id;
    const searchQuery = req.query.patientSearch;
    const patients = await searchPatient(searchQuery);
  
    if (patients && patients.length > 0) {
      const encodePatients = encodeURIComponent(JSON.stringify(patients));
      res.redirect(`/pharmacist/${id}?patients=${encodePatients}`);
    } else {
      res.redirect(`/pharmacist/${id}`);
    }
  };
  
  // Getting data from blockchain
  module.exports.showPatientDetails = async (req, res) => {
    const pharmacistId = req.params.id;
    const patientId = req.params.patientId;
    const patient = await Patient.findById(patientId);
    let DiagnosticCardAndPrescriptions;
    try {
      DiagnosticCardAndPrescriptions = await DiagnosticCardAndPrescriptionController.getPrescription(patientId);
      DiagnosticCardAndPrescriptions = DiagnosticCardAndPrescriptions.slice().sort((a, b) => b.date - a.date);
    } catch (err) {
      console.log(err);
    }
    res.render('pharmacist/showPatient', { patient, pharmacistId, DiagnosticCardAndPrescriptions });
  };
  