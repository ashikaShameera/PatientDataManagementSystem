const Patient = require("../models/patient");
const Doctor =require("../models/doctor");

module.exports.index=(req,res)=>{
    //This will use for search patient by doctor/reciption or admin
    res.render('patient/search')
}

module.exports.renderRegisterForm=(req,res)=>{ 
    res.render('patient/register')
}

module.exports.createPatient=async (req,res)=>{
    //creating newPatinet
    const patient=new Patient(req.body.patient);
    await patient.save();
    res.redirect(`/patient/${patient._id}`)
}

module.exports.showPatient=async(req,res)=>{
    const id=req.params.id;                     //Getting the patient id
    const patient=await Patient.findById(id);   //Get patient from database
    const encodedDoctor = req.query.doctor;     //Geting Doctor details from query parser

    if(encodedDoctor){
        const doctor = JSON.parse(decodeURIComponent(encodedDoctor));   //Put doctor to JSON object
        res.render('patient/show',{patient,doctor});//In here parse the whole doctor object to front it can reduce it
    }
    else{
        let doctor;         //To send null object of doctor if not it gives ejs error
        res.render('patient/show',{patient,doctor});  //Internal Medicine
    }
                 
}

//Use for to get doctor data by patient for make an appointmenet
module.exports.getDoctorDetails=async(req,res)=>{
    const id=req.params.id;
    const {selectType,DoctorSearchInput}=req.body;

    const doctors=await searchDoctors(selectType,DoctorSearchInput);       //calling the searchDoctors

    if(doctors){
        const encodedDoctor = encodeURIComponent(JSON.stringify(doctors));   //Encoding doctor for parse in url
        res.redirect(`/patient/${id}?doctor=${encodedDoctor}`);
    }else{
        res.redirect(`/patient/${id}`);
    }


 }

 //searchDoctors funtion this can go into another file in the future
 async function searchDoctors(selectType,DoctorSearchInput){

    let doctors ;

    if(selectType=="Specialization"){
        doctors=await Doctor.find({specialization:DoctorSearchInput});
    }
    else{

        //In here ignores the 3rd name if user input it
        const doctorName=DoctorSearchInput.trim()           // Remove leading/trailing whitespaces
        const nameParts=doctorName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts[1];

        let query = {};

        if(firstName && lastName){
            const firstNameRegex = new RegExp(`^${firstName}`, 'i'); // Regular expression to match names starting with firstName
            const lastNameRegex = new RegExp(`${lastName}$`, 'i'); // Regular expression to match names ending with lastName    
        
            query = {
                $or: [
                  { firstName: { $regex: firstNameRegex } },
                  { lastName: { $regex: lastNameRegex } }
                ]
              };
        }
        else if(firstName){
            const firstNameRegex = new RegExp(`^${firstName}`, 'i'); // Regular expression to match names starting with firstName
            query = {
                $or: [
                  { firstName: { $regex: firstNameRegex } },
                  { lastName: { $regex: firstNameRegex } }
                ]
              };
        }
        else{
            
            query = { _id: null }; // Set a default query that won't match any records
        }
        doctors = await Doctor.find(query);
    }
    return doctors;
 }




