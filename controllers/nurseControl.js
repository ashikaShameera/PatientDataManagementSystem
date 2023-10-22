const Nurse = require('../models/nurse')
const User = require('../models/user')
const Patient = require('../models/patient')
const bcrypt = require('bcrypt')
const {searchPatient}=require('../controllers/searchController');
const DiagnosticCardAndPrescriptionController=require('../controllers/DiagnosticCardAndPrescriptionController')


module.exports.registerNurse=async(req,res)=>{
  try {
    const nurse=new Nurse(req.body.nurse); 
    if (req.validationError) {
      // If there is an validation error , handle it accordingly
      res.status(400).render('admin/nurse/nurse', {
        nurses: null,
        error: req.validationError, // Use the error message from the middleware
      });
    }else{
    const saltRounds = 10; // Number of rounds (adjust as needed)
    const hashedPassword = await bcrypt.hash(nurse.password, saltRounds);
    nurse.password = hashedPassword   
    const user = new User({
       email: nurse.email,
       password: nurse.password,
       role: "Nurse",
       profile: nurse._id
     });       
    await user.save()     
    await nurse.save();      
    res.redirect(`/admin/nurse`);
    }
  } catch (error) {
    if (error.code === 11000) {
      // This error code (11000) indicates a duplicate key error
      // Handle the duplicate email or NIC error here
      res.status(400).render('admin/nurse/nurse', { nurses:null,
          error: 'Email or NIC is already in use. Please choose a different one.',
      });
      
  } else {
    res.status(400).render('admin/nurse/nurse', {
      nurses: null,
      error: 'Error occured during registration',
    });
  }
  }
     
 }

 module.exports.updateNurse = async (req, res) => {
   const { id } = req.params;
   const nurse = await Nurse.findByIdAndUpdate(id, { ...req.body.nurse });
   await nurse.save();
   res.redirect(`/nurse/${nurse.id}`);
 }

 module.exports.showNurse = async (req, res) => {
  const id = req.params.id;
  const nurse = await Nurse.findById(id);
  const encodePatients = req.query.patients;

  if (encodePatients) {
    const patients = JSON.parse(decodeURIComponent(encodePatients));
    res.render('nurse/show', { nurse, patients });
  } else {
    let patients;
    res.render('nurse/show', { nurse, patients });
  }
};

module.exports.getPatientDetails = async (req, res) => {
  const id = req.params.id;
  const searchQuery = req.query.patientSearch;
  const patients = await searchPatient(searchQuery);

  if (patients && patients.length > 0) {
    const encodePatients = encodeURIComponent(JSON.stringify(patients));
    res.redirect(`/nurse/${id}?patients=${encodePatients}`);
  } else {
    res.redirect(`/nurse/${id}`);
  }
};

// Getting data from blockchain
module.exports.showPatientDetails = async (req, res) => {
  const nurseId = req.params.id;
  const patientId = req.params.patientId;
  const patient = await Patient.findById(patientId);
  let DiagnosticCardAndPrescriptions;
  try {
    DiagnosticCardAndPrescriptions = await DiagnosticCardAndPrescriptionController.getPrescription(patientId);
    DiagnosticCardAndPrescriptions = DiagnosticCardAndPrescriptions.slice().sort((a, b) => b.date - a.date);
  } catch (err) {
    console.log(err);
  }
  res.render('nurse/showPatient', { patient, nurseId, DiagnosticCardAndPrescriptions });
};
