const selectType=document.querySelector("#selectType");
const DoctorSearchInput=document.querySelector("#DoctorSearchInput");
//const DoctorSearchBtn=document.querySelector("#DoctorSearchBtn")

selectType.addEventListener("change",()=>{
  if(selectType.value=="Specialization"){
    DoctorSearchInput.setAttribute('placeholder','Search Specialization')
  }
  else if(selectType.value=="NIC"){
    DoctorSearchInput.setAttribute('placeholder','NIC')
  }
  else if(selectType.value="Email"){
    DoctorSearchInput.setAttribute('placeholder','Email')
  }
  else if(selectType.value="ContactNumber"){
    DoctorSearchInput.setAttribute('placeholder','ContactNumber')
  }
  else{
    DoctorSearchInput.setAttribute('placeholder','Search Doctor Name (Max 30 Characters)')
  }
});

//Need to add auto complete when search by Specialization

const  specializationSuggestions = [
  'Internal Medicine',
  'Family Medicine',
  'Pediatrics',
  'Obstetrics and Gynecology',
  'General Surgery',
  'Anesthesiology',
  'Psychiatry',
  'Orthopedic Surgery',
  'Cardiology',
  'Dermatology'
]
