// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract PrescriptionAndDiagnosisCard {
    
    struct PrescriptionAndDiagnosis {
        string diagnosticDetails;
        string[] medicationNames;
        uint256 date;
    }

    mapping(string => PrescriptionAndDiagnosis[]) public patients;

    event PatientRecordAdded(string indexed patientIdentifier, string diagnosticDetails, string[] medicationNames, uint256 date);

    function addPatientRecord(string memory patientIdentifier, string memory _diagnosticDetails, string[] memory _medicationNames) public {
        PrescriptionAndDiagnosis memory record = PrescriptionAndDiagnosis({
            diagnosticDetails: _diagnosticDetails,
            medicationNames: _medicationNames,
            date: block.timestamp
        });

        patients[patientIdentifier].push(record);

        emit PatientRecordAdded(patientIdentifier, _diagnosticDetails, _medicationNames, block.timestamp);
    }

    function getPatientRecords(string memory patientIdentifier) public view returns (PrescriptionAndDiagnosis[] memory) {
        return patients[patientIdentifier];
    }
}
