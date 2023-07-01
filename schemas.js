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


