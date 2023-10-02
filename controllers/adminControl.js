//you must require admin module

const Doctor = require('../models/doctor');
const searchController=require('./searchController')

module.exports.renderAdminHomePage = (req, res) => {
    res.render("admin/home")
}

//Doctor Related Things
module.exports.renderAdminDoctorPage = async (req, res) => {

    let doctors;

    const selectType=req.query.selectType;
    let DoctorSearchInput=req.query.DoctorSearchInput;

    if(DoctorSearchInput)
        DoctorSearchInput=DoctorSearchInput.trim();

    doctors=await searchController.searchDoctorsAdmin(selectType,DoctorSearchInput) //Internal Medicine

    if(doctors.length<=0){
        doctors = await Doctor.find();
    }

    res.render("admin/doctor", { doctors })
}

module.exports.showDoctor = async (req, res) => {
    const id = req.params.id;
    const doctor = await Doctor.findById(id);
    res.render('admin/doctor/edit', { doctor })
}

module.exports.updateDoctor = async (req, res) => {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, { ...req.body.doctor });
    await doctor.save();
    res.redirect(`/admin/doctor`);
}

//AppointmentRelated Things
// module.exports.renderAppointmentPage = (req, res) => {
//     res.render("admin/appointment")
// }




module.exports.renderAdminPatientPage = (req, res) => {
    res.render("admin/patient")
}
//Nurse Related Things
module.exports.renderAdminNursePage =  (req, res) => {
    res.render("admin/nurse")
}
