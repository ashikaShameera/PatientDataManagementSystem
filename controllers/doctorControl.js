const Doctor=require('../models/doctor');

module.exports.renderRegisterForm=(req,res)=>{
   res.render("doctor/register")
}

// module.exports.registerDoctor=async(req,res)=>{
//    // For the save doctor in the database
//    const doctor=new Doctor(req.body.doctor); //this is not going to use because after admin create the 
//    await doctor.save();                      //doctor it cant redirect to docators page
//    res.redirect(`/doctor/${doctor._id}`);
// }

module.exports.registerDoctor=async(req,res)=>{
   // For the save doctor in the database
   const doctor=new Doctor(req.body.doctor); 
   await doctor.save();                      
   res.redirect(`/admin/doctor`);
   //need to add flash msg 
}

module.exports.showDoctor=async(req,res)=>{
      const id=req.params.id;
      const doctor=await Doctor.findById(id);
      res.render('doctor/show',{doctor});
}

module.exports.showAllDoctors=async(req,res)=>{
   const doctors=await Doctor.find();
   console.log(doctors)
   res.render('admin/doctor/index',{doctors})
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

module.exports.getPatientDetails= async(req,res)=>{
   const id=req.params.id;
   //todo
}