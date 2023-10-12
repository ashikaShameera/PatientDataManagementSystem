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
  password: Joi.string()
});

module.exports.doctorSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  nic: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other').required(),
  contactNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.object({
    number: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
  }),
  medicalLicenseNumber: Joi.string().required(),
  specialization: Joi.string().valid(
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
  ).required(),
  degree: Joi.string().required(),
  university: Joi.string().required(),
  password: Joi.string(),
});

module.exports.insurerSchema = Joi.object({
  companyName: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.object({
    number: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
  }),
  iic: Joi.string().required(),
  contactNumber: Joi.string().required(),
  password: Joi.string(),
});

module.exports.nurseSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  nic: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other'),
  contactNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.object({
    number: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
  }),
  nurseLicenseNumber: Joi.string().required(),
  password: Joi.string(),
});

module.exports.pharmacistSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  nic: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid('Male', 'Female', 'Other'),
  contactNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.object({
    number: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
  }),
  pharmacistLicenseNumber: Joi.string().required(),
  password: Joi.string(),
});
