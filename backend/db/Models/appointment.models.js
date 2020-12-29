const mongoose = require("mongoose");
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  appointmentDate:{ type:String},
  numberOfPeople:{ type:Number},
  place:{ type:String}
})

const Appointment = mongoose.model('appoinment',AppointmentSchema)


module.exports.Appointment = Appointment