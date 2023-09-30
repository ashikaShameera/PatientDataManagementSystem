const { setPrescriptionAndDiagnosisCard, getPrescriptionAndDiagnosisCard } = require('../blockchainInterface');

//patientIdentifier = its must be string and its the patient id
//_diagnosticDetails =its the diagnostic text area its a string
//_medicationNames its the medication names of the prsecription its a array of strings


///you can use this controller for communication with blcokchain
module.exports.getPrescription=async (patientIdentifier)=>{
    return await getPrescriptionAndDiagnosisCard(patientIdentifier);
}