const Joi = require('joi');
const { number } = require('joi');

module.exports.patientSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.date().iso().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  contactNumber: Joi.string().required(),
  nic: Joi.string().required(),
  address: Joi.object({
    number: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
  }).required(),
  medicalHistory: Joi.object({
    allergies: Joi.string().required(),
    conditions: Joi.string().required(),
    medications: Joi.string().required(),
  }).required(),
  emergencyContact: Joi.object({
    EmgName: Joi.string().required(),
    EmgRelationship: Joi.string().required(),
    EmgContactNumber: Joi.string().required(),
  }).required(),
});

// module.exports.patientSchema = Joi.object({
//   firstName: Joi.string().required(),
//   lastName: Joi.string().required(),
//   dateOfBirth: Joi.date().required(),
//   gender: Joi.string().valid('Male', 'Female', 'Other').required(),
//   nic: Joi.string().required(),
//   contactNumber: Joi.string().required(),
//   email: Joi.string().email().required(),
//   address: Joi.object({
//     number: Joi.number().required(),
//     street: Joi.string().required(),
//     city: Joi.string().required(),
//     state: Joi.string().required(),
//     postalCode: Joi.number().required()
//   }).required(),
//   medicalHistory: Joi.object({
//     allergies: Joi.array().items(Joi.string()),
//     conditions: Joi.array().items(Joi.string()),
//     medications: Joi.array().items(Joi.string())
//   }),
//   emergencyContact: Joi.object({
//     EmgName: Joi.string().required(),
//     EmgRelationship: Joi.string().required(),
//     EmgContactNumber: Joi.string().required()
//   }).required()
// });
