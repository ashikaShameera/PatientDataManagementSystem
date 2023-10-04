//you must require admin module

const doctor = require('../models/doctor');
const Doctor = require('../models/doctor');
const Nurse =require('../models/nurse')
const User = require('../models/user')
const Pharmacist = require('../models/pharmacist')
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
    const { email } = req.body.doctor;
    const doctor = await Doctor.findByIdAndUpdate(id,req.body.doctor);
    const user = await User.findOne({ profile: doctor._id })
    user.email = email
    await doctor.save()
    await user.save()    
    
    res.redirect(`/admin/nurse`);
}

module.exports.deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        await User.deleteOne({profile: id})
        await Doctor.findByIdAndDelete(id);
                // Redirect to the nurse list page or send a success response
        res.json({ success: true });
    } catch (error) {
        // Handle any errors and send an error response
        console.error('Error deleting Doctor:', error);
        res.status(500).json({ error: 'Failed to delete Doctor' });
    }
};

//AppointmentRelated Things
// module.exports.renderAppointmentPage = (req, res) => {
//     res.render("admin/appointment")
// }




module.exports.renderAdminPatientPage = (req, res) => {
    res.render("admin/patient")
}
//Nurse Related Things
module.exports.renderAdminNursePage = async (req, res) => {

    let nurses;

    let NurseSearchInput=req.query.NurseSearchInput;

    if(NurseSearchInput)
        NurseSearchInput=NurseSearchInput.trim();

    nurses=await searchController.searchNurse(NurseSearchInput)

    if(nurses.length<=0){
        nurses=await Nurse.find();
    }
    res.render("admin/nurse/nurse",{nurses});
}

module.exports.showNurse = async (req, res) => {
    const id = req.params.id;
    const nurse = await Nurse.findById(id);
    res.render('admin/nurse/edit', { nurse })
}

module.exports.updateNurse = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body.nurse;
    const nurse = await Nurse.findByIdAndUpdate(id,req.body.nurse);
    const user = await User.findOne({ profile: nurse._id })
    user.email = email
    await nurse.save()
    await user.save()    
    
    res.redirect(`/admin/nurse`);
}

module.exports.deleteNurse = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        await User.deleteOne({profile: id})
        await Nurse.findByIdAndDelete(id);
                // Redirect to the nurse list page or send a success response
        res.json({ success: true });
    } catch (error) {
        // Handle any errors and send an error response
        console.error('Error deleting nurse:', error);
        res.status(500).json({ error: 'Failed to delete nurse' });
    }
};

//pharmacist related things

module.exports.renderAdminPharmacistPage = async (req, res) => {
    let pharmacists;
    let PharmacistSearchInput = req.query.PharmacistSearchInput;

    if (PharmacistSearchInput)
        PharmacistSearchInput = PharmacistSearchInput.trim();

    pharmacists = await searchController.searchPharmacist(PharmacistSearchInput);

    if (pharmacists.length <= 0) {
        pharmacists = await Pharmacist.find();
    }

    res.render("admin/pharmacist/pharmacist", { pharmacists });
}

module.exports.showPharmacist = async (req, res) => {
    const id = req.params.id;
    const pharmacist = await Pharmacist.findById(id);
    res.render('admin/pharmacist/edit', { pharmacist });
}

module.exports.updatePharmacist = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body.pharmacist;
    const pharmacist = await Pharmacist.findByIdAndUpdate(id, req.body.pharmacist);
    const user = await User.findOne({ profile: pharmacist._id });
    user.email = email;
    await pharmacist.save();
    await user.save();

    res.redirect(`/admin/pharmacist`);
}

module.exports.deletePharmacist = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        await User.deleteOne({ profile: id });
        await Pharmacist.findByIdAndDelete(id);

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting pharmacist:', error);
        res.status(500).json({ error: 'Failed to delete pharmacist' });
    }
};

