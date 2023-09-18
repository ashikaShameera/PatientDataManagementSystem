const Appointment=require('../models/appointment');

const {searchDoctorsAdmin,searchDoctorById}=require('./searchController');

//This will get all the appointments
module.exports.showAllAppointments=async(req,res)=>{
    //these must be changed to upcomming appointments
    //toDo
    const appointmenets=await Appointment.find();
    res.send(appointmenets)
}

module.exports.renderAppointmentDoctorSearchForm=(req,res)=>{
    const encodedDoctor = req.query.doctor;     //Geting Doctor details from query parser    
    if(encodedDoctor){
        const doctor = JSON.parse(decodeURIComponent(encodedDoctor));   //Put doctor to JSON object
        res.render('admin/appointment/doctorSearch',{doctor});//In here parse the whole doctor object to front it can reduce it
    }
    else{
        let doctor;         //To send null object of doctor if not it gives ejs error
        res.render('admin/appointment/doctorSearch',{doctor});  //Internal Medicine
    }

}

// this render the appointment form for creating the apponitment
module.exports.renderNewAppointmentForm=async(req,res)=>{
    const doctor=await searchDoctorById(req.params.id)
    if(doctor){
    //In here sending inportance details only
    res.render("admin/appointment/new",{doctor:{
        firstName:doctor.firstName,
        lastName:doctor.lastName,
        specialization:doctor.specialization,
        email:doctor.email,
        id:doctor.id
    }})
}
}

//use to vreate apponintment
module.exports.createAppointment=async(req,res)=>{
    const appointmenet=new Appointment(req.body.appointment);
    await appointmenet.save();
    res.send(appointmenet)
    //todo
}


//Use for to get doctor data by patient for make an appointmenet
module.exports.getDoctorDetails=async(req,res)=>{
    
     const {selectType,DoctorSearchInput}=req.body;

     const doctors=await searchDoctorsAdmin(selectType,DoctorSearchInput);       //calling the searchDoctors

    if(doctors){
        const encodedDoctor = encodeURIComponent(JSON.stringify(doctors));   //Encoding doctor for parse in url
        res.redirect(`new?doctor=${encodedDoctor}`);
    }else{
        res.redirect(`new`);
    }

 }