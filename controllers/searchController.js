const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Nurse =require('../models/nurse')

module.exports.searchDoctors = async (selectType, DoctorSearchInput) => {
  let doctors;

  if (selectType == "Specialization") {
    doctors = await Doctor.find({ specialization: DoctorSearchInput });
  } else {
    //In here ignores the 3rd name if user input it
    const doctorName = DoctorSearchInput.trim(); // Remove leading/trailing whitespaces
    const nameParts = doctorName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[1];

    let query = {};

    if (firstName && lastName) {
      const firstNameRegex = new RegExp(`^${firstName}`, "i"); // Regular expression to match names starting with firstName
      const lastNameRegex = new RegExp(`${lastName}$`, "i"); // Regular expression to match names ending with lastName

      query = {
        $or: [
          { firstName: { $regex: firstNameRegex } },
          { lastName: { $regex: lastNameRegex } },
        ],
      };
    } else if (firstName) {
      const firstNameRegex = new RegExp(`^${firstName}`, "i"); // Regular expression to match names starting with firstName
      query = {
        $or: [
          { firstName: { $regex: firstNameRegex } },
          { lastName: { $regex: firstNameRegex } },
        ],
      };
    } else {
      query = { _id: null }; // Set a default query that won't match any records
    }
    doctors = await Doctor.find(query);
  }
  return doctors;
};

//This function use by admin to get doctors to make appointmetns
module.exports.searchDoctorsAdmin = async (selectType, DoctorSearchInput="") => {
  let doctors;

  if (selectType === "Specialization") {
    doctors = await Doctor.find({ specialization: DoctorSearchInput });
  }
  else if (selectType === "NIC") {
    doctors = await Doctor.find({ nic: DoctorSearchInput });
  }
  else if (selectType === "Email") {
    doctors = await Doctor.find({ email: DoctorSearchInput });
  }
  else if (selectType === "ContactNumber") {
    doctors = await Doctor.find({ contactNumber: DoctorSearchInput });
  }
  else {
    const doctorName = DoctorSearchInput.trim();
    const nameParts = doctorName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[1];

    let query = {};

    if (firstName && lastName) {
      const firstNameRegex = new RegExp(`^${firstName}`, "i");
      const lastNameRegex = new RegExp(`${lastName}$`, "i");

      query = {
        $or: [
          { firstName: { $regex: firstNameRegex } },
          { lastName: { $regex: lastNameRegex } },
        ],
      };
    } else if (firstName) {
      const firstNameRegex = new RegExp(`^${firstName}`, "i");
      query = {
        $or: [
          { firstName: { $regex: firstNameRegex } },
          { lastName: { $regex: firstNameRegex } },
        ],
      };
    } else {
      query = { _id: null };
    }

    doctors = await Doctor.find(query);
  }

  return doctors;
};


//This function use to find doctor using id
module.exports.searchDoctorById = async (doctorId) => {
  return (await Doctor.findById(doctorId));
}


//To find Patinet
//searchQuery can be name,phone number,email or NIC
module.exports.searchPatient=async (searchQuery)=>{

let patients;

// Split the search query into parts (firstName and lastName)
const queryParts = searchQuery.split(' ');
const firstName = queryParts[0];
const lastName = queryParts.length > 1 ? queryParts.slice(1).join(' ') : '';

  try{
     patients = await Patient.find({
      $or: [
        { email: searchQuery },
        { nic: searchQuery },
        { contactNumber: searchQuery },
        { $or: [{ firstName }, { lastName }] } // Search by both firstName and lastName
      ]
    });
  }catch(erro){
    console.log(erro)
  }

  return patients;
}

module.exports.searchNurse=async (searchQuery="")=>{

  let nurses;
  
  // Split the search query into parts (firstName and lastName)
  const queryParts = searchQuery.split(' ');
  const firstName = queryParts[0];
  const lastName = queryParts.length > 1 ? queryParts.slice(1).join(' ') : '';
  
    try{
      nurses = await Nurse.find({
        $or: [
          { email: searchQuery },
          { nic: searchQuery },
          { contactNumber: searchQuery },
          { $or: [{ firstName }, { lastName }] } // Search by both firstName and lastName
        ]
      });
    }catch(erro){
      console.log(erro)
    }
  
    return nurses;
  }
