const mongoose = require('mongoose')

const Schema = mongoose.Schema

const aboutMyself = new Schema({
    id: {
        type: String
    },
    title: {
        type: String
    },
    deskripsi: {
        type: String
    },
    image: {
        type: String
    },
    dataBio: {
        type: Array
    },
    nameIcon: {
        type: String
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('about-myself', aboutMyself)