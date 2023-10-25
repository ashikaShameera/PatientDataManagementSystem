const {
    patientSchema,
    doctorSchema,
    nurseSchema,
    insurerSchema,
    pharmacistSchema,
  } = require('./schemas.js'); // Import all your Joi schemas
  
  const ExpressError = require('./utils/ExpressError.js');
  
  module.exports.isValidatePatient = (req, res, next) => {
    const { error } = patientSchema.validate(req.body.patient);
    if (error) {
      const msg = error.details.map(el => el.message).join(',');
     req.validationError = msg
     next()
    } else {
      next();
    }
  };
  
  module.exports.isValidateDoctor = (req, res, next) => {
    const { error } = doctorSchema.validate(req.body.doctor);
    if (error) {
      const msg = error.details.map(el => el.message).join(',');
      req.validationError = msg
      next()
    } else {
      next();
    }
  };
  
  module.exports.isValidateNurse = (req, res, next) => {
    const { error } = nurseSchema.validate(req.body.nurse);
    if (error) {
      const msg = error.details.map(el => el.message).join(',');
      req.validationError = msg
      next()
    } else {
      next();
    }
  };
  
  module.exports.isValidateInsurer = (req, res, next) => {
    const { error } = insurerSchema.validate(req.body.insurer);
    if (error) {
      const msg = error.details.map(el => el.message).join(',');
      req.validationError = msg
      next()
    } else {
      next();
    }
  };
  
  module.exports.isValidatePharmacist = (req, res, next) => {
    const { error } = pharmacistSchema.validate(req.body.pharmacist);
    if (error) {
      const msg = error.details.map(el => el.message).join(',');
      req.validationError = msg
      next()
    } else {
      next();
    }
  };
  