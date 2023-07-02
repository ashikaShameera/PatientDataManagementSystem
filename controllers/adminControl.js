//you must require admin module

module.exports.renderAdminHomePage=(req,res)=>{
    res.render("admin/home")
}

module.exports.renderAdminDoctorPage=(req,res)=>{
    res.render("admin/doctor")
}