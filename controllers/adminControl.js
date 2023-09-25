//you must require admin module

const Doctor=require('../models/doctor');


const Doctor = require('../models/doctor');

module.exports.renderAdminHomePage = (req, res) => {
    res.render("admin/home")
}

//Doctor Related Things
module.exports.renderAdminDoctorPage=async (req,res)=>{
    const doctors=await Doctor.find();
    res.render("admin/doctor",{doctors})
}

module.exports.showDoctor=async (req,res)=>{
    const id=req.params.id;
    const doctor=await Doctor.findById(id);
    res.render('admin/doctor/edit',{doctor})
}

module.exports.updateDoctor=async(req,res)=>{
    const {id} =req.params;
    const doctor=await Doctor.findByIdAndUpdate(id,{...req.body.doctor});
    await doctor.save();
    res.redirect(`/admin/doctor`);
 }

//AppointmentRelated Things
module.exports.renderAppointmentPage=(req,res)=>{
    res.render("admin/appointment")
}

module.exports.renderAdminPatientPage=(req,res)=>{
    res.render("admin/patient")
}