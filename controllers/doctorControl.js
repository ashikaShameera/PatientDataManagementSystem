const Doctor=require('../models/doctor');

module.exports.renderRegister=(req,res)=>{
   res.render("doctor/register")
}

module.exports.registerDoctor=(req,res)=>{
   res.send("creating doctor");
}