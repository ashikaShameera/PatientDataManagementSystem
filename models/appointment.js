const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const Doctor=require('./doctor');
const Patient=require('./patient');

//there is so mnay to add this 
const appointmentSchema = new Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const currentDate = new Date();
        return value > currentDate;
      },
      message: 'Appointment date must be greater than the current date'
    }
  },
  time: {
    type:String,
    required:true
  },
  roomNumber:{
    type: Number,
    required:true
  }
  ,
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  }],
  maximumPatients: {
    type: Number,
    default: 10
  },
  
  currentPatients: {
    type: Number,
    default: 0
  },
  

});


// Compound index for date, time, and roomNumber
appointmentSchema.index({ date: 1, time: 1, roomNumber: 1 }, { unique: true });
/* 
    Please note that when you try to insert or update appointments with duplicate 
    combinations of date, time, and roomNumber, MongoDB will throw an error to maintain 
    the uniqueness constraint.
*/
module.exports = mongoose.model('Appointment', appointmentSchema);

