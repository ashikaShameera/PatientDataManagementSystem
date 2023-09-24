//you must require admin module

const Doctor=require('../models/doctor');

module.exports.renderAdminHomePage=(req,res)=>{
    res.render("admin/home")
}

module.exports.renderAdminDoctorPage=async (req,res)=>{
    const doctors=await Doctor.find();
    res.render("admin/doctor",{doctors})
}

module.exports.renderAppointmentPage=(req,res)=>{
    res.render("admin/appointment")
}

module.exports.renderAdminPatientPage=(req,res)=>{
    res.render("admin/patient")
}