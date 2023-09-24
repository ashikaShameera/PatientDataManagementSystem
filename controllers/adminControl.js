//you must require admin module

module.exports.renderAdminHomePage=(req,res)=>{
    res.render("admin/home")
}

module.exports.renderAdminDoctorPage=(req,res)=>{
    res.render("admin/doctor")
}

module.exports.renderAppointmentPage=(req,res)=>{
    res.render("admin/appointment")
}

module.exports.renderAdminPatientPage=(req,res)=>{
    res.render("admin/patient")
}