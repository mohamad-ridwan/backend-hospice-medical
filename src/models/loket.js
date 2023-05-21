const mongoose = require('mongoose')

const Schema = mongoose.Schema

const loket = new Schema({
    id: {
        type: String
    },
    loketRules: {
        type: String
    },
    loketName: {
        type: String
    },
    patientId: {
        type: String
    },
    jenisPenyakit: {
        type: String
    },
    patientName: {
        type: String
    },
    emailAddress: {
        type: String
    },
    phone: {
        type: String
    },
    queueNumber:{
        type: String
    },
    message: {
        type: String
    },
    emailAdmin: {
        type: String
    },
    isNotif: {
        type: Boolean
    },
    presence:{
        type: String
    },
    loketInfo: {
        type: Array
    },
    isConfirm: {
        type: Object
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('loket', loket)