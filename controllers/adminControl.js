//you must require admin module

module.exports.renderAdminHomePage=(req,res)=>{
    const id=req.params.id;
    res.render("admin/home",{id})
}