const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Patient', 'Doctor','Admin','Nurse','Pharmacist'],
    required: true
  },
  profile: {
    type: Schema.Types.ObjectId,
    refPath: 'role', // This field will reference either 'Patient' or 'Doctor'
  }
});

module.exports = mongoose.model('User', userSchema);
