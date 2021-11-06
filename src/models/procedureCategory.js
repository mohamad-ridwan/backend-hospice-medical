const mongoose = require('mongoose')

const Schema = mongoose.Schema

const procedureCategory = new Schema({
    id:{
        type: String
    },
    title: {
        type: String
    },
    deskripsi: {
        type: String
    },
    dataImg: {
        type: Array
    }
},{
    timestamps: true
})

module.exports = mongoose.model('procedure-category', procedureCategory)