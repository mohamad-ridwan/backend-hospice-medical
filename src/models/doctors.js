const mongoose = require('mongoose')

const Schema = mongoose.Schema

const doctors = new Schema({
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
    image: {
        type: String
    },
    name: {
        type: String
    },
    medsos: {
        type: Array
    },
    nameIcon: {
        type: String
    },
    path: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('doctor', doctors)