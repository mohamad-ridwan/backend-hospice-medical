const mongoose = require('mongoose')

const Schema = mongoose.Schema

const servicingHours = new Schema({
    id: {
        type: String
    },
    title: {
        type: String
    },
    deskripsi: {
        type: String
    },
    data: {
        type: Array
    },
    day: {
        type: String
    },
    time: {
        type: String
    },
    diseaseType: {
        type: Array
    },
    jenis:{
        type: String
    },
    userAppointmentData:{
        type: Array
    },
    patientName:{
        type: String
    },
    phone:{
        type: String
    },
    emailAddress: {
        type: String
    },
    dateOfBirth:{
        type: String
    },
    jenisPenyakit: {
      type: String  
    },
    appointmentDate:{
        type: String
    },
    message: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('servicing-hours', servicingHours)