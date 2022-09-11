const { Schema, model} = require("mongoose");

const PatientSchema = ({
   name:String,
   age:Number,
   gender:String,
   img:String,
   medicine:Number,
});

const Patients = model("patients",PatientSchema);

module.exports = Patients;