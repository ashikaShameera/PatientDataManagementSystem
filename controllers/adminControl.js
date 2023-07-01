//you must require admin module

module.exports.renderAdminHomePage=(req,res)=>{
    const id=req.params.id;
    res.render("admin/home",{id})
}

module.exports.renderAdminDoctorPage=(req,res)=>{
    res.render("admin/doctor")
}