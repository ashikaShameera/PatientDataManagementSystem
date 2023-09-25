const currentPath = window.location.pathname;
const links = document.querySelectorAll('ul li a');

links.forEach((link) => {
  if (link.getAttribute('href') === currentPath) {
    link.parentNode.classList.add('active');
  }
});


const selectType=document.querySelector("#selectType");
const DoctorSearchInput=document.querySelector("#DoctorSearchInput");

selectType.addEventListener("change",()=>{

  switch(selectType.value){
    case "NIC":
      DoctorSearchInput.setAttribute('placeholder','Enter NIC');
      break;
    case "Specialization" :
      DoctorSearchInput.setAttribute('placeholder','Enter Specialization of Doctor'); 
      break;
    case "Email":
      DoctorSearchInput.setAttribute('placeholder','Email'); 
      break;
    case "PhoneNumber":
      DoctorSearchInput.setAttribute('placeholder','Phone number'); 
      break;
    case "DoctorName":
      DoctorSearchInput.setAttribute('placeholder',"Search Doctor Name (Max 30 Characters)")
      break;
    default:
      DoctorSearchInput.setAttribute('placeholder',"Search Doctor Name (Max 30 Characters)")
  }


});