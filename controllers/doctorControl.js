const {searchPatient}=require('../controllers/searchController');
const DiagnosticCardAndPrescriptionController=require('../controllers/DiagnosticCardAndPrescriptionController')

const Doctor=require('../models/doctor');
const Appointment=require('../models/appointment')
const Patient = require('../models/patient');
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { date } = require('joi');

module.exports.renderRegisterForm=(req,res)=>{
   res.render("doctor/register")
}

// module.exports.registerDoctor=async(req,res)=>{
//    // For the save doctor in the database
//    const doctor=new Doctor(req.body.doctor); //this is not going to use because after admin create the 
//    await doctor.save();                      //doctor it cant redirect to docators page
//    res.redirect(`/doctor/${doctor._id}`);
// }

// For the save doctor in the database
module.exports.registerDoctor=async(req,res)=>{
   const doctor=new Doctor(req.body.doctor); 
   const saltRounds = 10; // Number of rounds (adjust as needed)
   const hashedPassword = await bcrypt.hash(doctor.password, saltRounds);
   doctor.password = hashedPassword
   await doctor.save();   
   const user = new User({
      email: doctor.email,
      password: doctor.password,
      role: "Doctor",
      profile: doctor._id
    });       
   await user.save()           
   res.redirect(`/admin/doctor`);
   //need to add flash msg 
}

module.exports.showDoctor=async(req,res)=>{
      const id=req.params.id;
      const doctor=await Doctor.findById(id);
      const encodePatients=req.query.patients;
      
      const currentDate = new Date();

      const upCommingAppointments=await Appointment.find({
         doctor: id,
         date: { $gt: currentDate }
       })

      const pastAppointments=await Appointment.find({
         doctor: id,
         date: { $lt: currentDate }
       }).sort({ date: -1 }); // Descending order

      if(encodePatients){
        const patients = JSON.parse(decodeURIComponent(encodePatients));   //Put doctor to JSON object
        res.render('doctor/show',{doctor,upCommingAppointments,pastAppointments,patients});//In here parse the whole doctor object to front it can reduce it
      }
      else{
         let patients;
         res.render('doctor/show',{doctor,upCommingAppointments,pastAppointments,patients})
      }
}

module.exports.getPatientDetails= async(req,res)=>{

   const id=req.params.id;
   const searchQuery = req.query.patientSearch;
   const patients=await searchPatient(searchQuery)

   if(patients && patients.length > 0){
      const encodePatients= encodeURIComponent(JSON.stringify(patients));
      res.redirect(`/doctor/${id}?patients=${encodePatients}`);
   }
   else{
      res.redirect(`/doctor/${id}`)
   }
}

//Getting data from blockchain 
module.exports.showPatientDetails=async(req,res)=>{
   const doctorId=req.params.id;
   const patientId=req.params.patientId;
   const patient=await Patient.findById(patientId);
   let DiagnosticCardAndPrescriptions;
   try{
      DiagnosticCardAndPrescriptions=await DiagnosticCardAndPrescriptionController.getPrescription(patientId);
      DiagnosticCardAndPrescriptions = DiagnosticCardAndPrescriptions.slice().sort((a, b) => b.date - a.date);
   }catch(err){
      console.log(err);
   }
   res.render('doctor/showPatient',{patient,doctorId,DiagnosticCardAndPrescriptions})
}

//Adding data to the blockchain
module.exports.addDiagnosticCardAndPrescription=async(req,res)=>{

   const doctorId=req.params.id;
   const patientId=req.body.patientId;
   const diagnosticDetails=req.body.diagnosticDetails;
   const prescription=Object.values(req.body.prescription) //This convert the objects to array

   try{
      const data=await DiagnosticCardAndPrescriptionController.setPrescription(patientId,diagnosticDetails,prescription);
   }catch(err){
      console.log(err);
   }
   res.redirect(`/doctor/${doctorId}/patients/${patientId}`);
}


module.exports.renderEditForm=async(req,res)=>{
   const {id}=req.params;
   const doctor=await Doctor.findById(id);
   if(!doctor){
      return res.send("This must send to the doctor searching"); //Todo
   }
   res.render('doctor/edit',{doctor});
}

module.exports.updateDoctor=async(req,res)=>{
   const {id} =req.params;
   const doctor=await Doctor.findByIdAndUpdate(id,{...req.body.doctor});
   await doctor.save();
   res.redirect(`/doctor/${doctor.id}`);
   res.send(doctor)
}

module.exports.deleteDoctor=async(req,res)=>{
   const {id}=req.params;
   await Doctor.findByIdAndDelete(id);
   res.send(`doctor Id=${id} is deleted`)//this must redirect relevent page
}


