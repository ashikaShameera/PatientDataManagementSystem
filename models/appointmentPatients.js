const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentPatientSchema = new Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
});

module.exports = mongoose.model('AppointmentPatient', appointmentPatientSchema);

