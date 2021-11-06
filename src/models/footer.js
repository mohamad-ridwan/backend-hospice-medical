const mongoose = require('mongoose')

const Schema = mongoose.Schema

const footer = new Schema({
    id: {
        type: String
    },
    alamat: {
        type: String
    },
    noTelpSatu: {
        type: String
    },
    noTelpDua: {
        type: String
    },
    copyRight: {
        type: String
    },
    data: {
        type: Array
    }
},{
    timestamps: true
})

module.exports = mongoose.model('footer', footer)