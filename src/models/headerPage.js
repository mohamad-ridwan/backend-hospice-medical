const mongoose = require('mongoose')

const Schema = mongoose.Schema

const headerPage = new Schema({
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
    }
},{
    timestamps: true
})

module.exports = mongoose.model('header-page', headerPage)