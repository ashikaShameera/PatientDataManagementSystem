const Insurer = require('../models/insurer')
const User = require('../models/user')
const Patient = require('../models/patient')
const bcrypt = require('bcrypt')
const {searchPatient}=require('../controllers/searchController');
const DiagnosticCardAndPrescriptionController=require('../controllers/DiagnosticCardAndPrescriptionController')


module.exports.registerInsurer=async(req,res)=>{
   try {
   const insurer=new Insurer(req.body.insurer); 
    const saltRounds = 10; // Number of rounds (adjust as needed)
    const hashedPassword = await bcrypt.hash(insurer.password, saltRounds);
    insurer.password = hashedPassword  
    const user = new User({
       email: insurer.email,
       password: insurer.password,
       role: "Insurer",
       profile: insurer._id
     });       
    await user.save()    
    await insurer.save();        
    res.redirect(`/admin/insurer`);
    
   } catch (error) {
      if (error.code === 11000) {
         // This error code (11000) indicates a duplicate key error
         // Handle the duplicate email or NIC error here
         res.status(400).render('admin/insurer/insurer', { insurers:null,
             error: 'Email or IIC is already in use. Please choose a different one.',
         });
         
     } else {
         // Handle other errors (e.g., validation errors)
         console.error('Error during registration:', error);
         res.status(500).render('error', { error: 'Registration failed' });
     }
   }
     
 }

 module.exports.showInsurer = async (req, res) => {
  const id = req.params.id;
  const insurer = await Insurer.findById(id);
  const encodePatients = req.query.patients;

  if (encodePatients) {
    const patients = JSON.parse(decodeURIComponent(encodePatients));
    res.render('insurer/show', { insurer, patients });
  } else {
    let patients;
    res.render('insurer/show', { insurer, patients });
  }
};

module.exports.getPatientDetails = async (req, res) => {
  const id = req.params.id;
  const searchQuery = req.query.patientSearch;
  const patients = await searchPatient(searchQuery);

  if (patients && patients.length > 0) {
    const encodePatients = encodeURIComponent(JSON.stringify(patients));
    res.redirect(`/insurer/${id}?patients=${encodePatients}`);
  } else {
    res.redirect(`/insurer/${id}`);
  }
};

// Getting data from blockchain
module.exports.showPatientDetails = async (req, res) => {
  const insurerId = req.params.id;
  const patientId = req.params.patientId;
  const patient = await Patient.findById(patientId);
  let DiagnosticCardAndPrescriptions;
  try {
    DiagnosticCardAndPrescriptions = await DiagnosticCardAndPrescriptionController.getPrescription(patientId);
    DiagnosticCardAndPrescriptions = DiagnosticCardAndPrescriptions.slice().sort((a, b) => b.date - a.date);
  } catch (err) {
    console.log(err);
  }
  res.render('insurer/showPatient', { patient, insurerId, DiagnosticCardAndPrescriptions });
};
