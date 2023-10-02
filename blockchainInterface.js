const Web3=require("web3");
const PrescriptionAndDiagnosisCard=require('./build/contracts/PrescriptionAndDiagnosisCard.json');

const provider=new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
const web3=new Web3(provider);
const ABI=PrescriptionAndDiagnosisCard.abi;
const contractAddress=PrescriptionAndDiagnosisCard.networks[5777].address
const contract=new web3.eth.Contract(ABI,contractAddress);
           
async function main() {
    try {
        const accounts = await getAllAcounts(); // Wait for the promise to resolve
        return accounts;
    } catch (error) {
      console.error(error);
    }
  }


//patientIdentifier = its must be string and its the patient id
//_diagnosticDetails =its the diagnostic text area its a string
//_medicationNames its the medication names of the prsecription its a array of strings

async function getAllAcounts(){
    return await web3.eth.getAccounts(); //Getting account addreses of blockchain
}

async function getPrescriptionAndDiagnosisCard(patientIdentifier){
    const data=await contract.methods.getPatientRecords(patientIdentifier).call();
    //console.log(data);
    return data;
}

async function setPrescriptionAndDiagnosisCard(patientIdentifier,_diagnosticDetails,_medicationNames,gasLimit=200000){
    const addreses=await getAllAcounts();
    const data=await contract.methods.addPatientRecord(patientIdentifier,_diagnosticDetails,_medicationNames).send({
        from:addreses[1],  //This address is get from ganache used first address of the blockchain
        gas:gasLimit
    });
    console.log(data)
    return data;
}

// Export the functions for use in other modules
module.exports = {
    setPrescriptionAndDiagnosisCard,
    getPrescriptionAndDiagnosisCard,
  };

//setPrescriptionAndDiagnosisCard("6465f5eb5d0dfdb8219dfcf3","leg canscer",["cloderman","diagin"]);
//getPrescriptionAndDiagnosisCard("6465f5eb5d0dfdb8219dfcf3");

