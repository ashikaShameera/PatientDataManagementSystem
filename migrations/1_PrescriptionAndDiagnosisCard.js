const PrescriptionAndDiagnosisCard = artifacts.require("./PrescriptionAndDiagnosisCard.sol");

module.exports = function (deployer) {
  deployer.deploy(PrescriptionAndDiagnosisCard);
};