const mongoose = require('mongoose')

const Schema = mongoose.Schema

const finishedTreatment = new Schema({
    id: {
        type: String
    },
    patientId: {
        type: String
    },
    patientName: {
        type: String,
    },
    patientEmail:{
        type: String
    },
    phone:{
        type: String
    },
    dateConfirm: {
        type: String
    },
    confirmHour:{
        type: String
    },
    emailAdmin:{
        type: String
    },
    nameAdmin:{
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('finished-treatment', finishedTreatment)