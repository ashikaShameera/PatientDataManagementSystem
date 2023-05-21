const Patient = require("../models/patient")

module.exports.index=(req,res)=>{
    //This will use for search patient by doctor/reciption or admin
    res.render('patient/search')
}

module.exports.renderNewForm=(req,res)=>{ 
    res.render('patient/new')
}

module.exports.createPatient=async (req,res)=>{
    //creating newPatinet
    const patient=new Patient(req.body.patient);
    await patient.save();
    console.log(patient);
    res.redirect(`/patient/${patient._id}`)
}

module.exports.showPatient=async(req,res)=>{
    const id=req.params.id;
    const patient=await Patient.findById(id);
    res.render('patient/show',{patient});
}



