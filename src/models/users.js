const mongoose = require('mongoose')

const Schema = mongoose.Schema

const users = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
    password: {
        type: String
    }
}, {
    timestamp: true
})

module.exports = mongoose.model('user', users)