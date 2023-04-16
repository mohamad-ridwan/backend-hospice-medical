const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blackListJwt = new Schema({
    id: {
        type: String
    },
    token: {
        type: String
    }
}, {
    timestamp: true
})

module.exports = mongoose.model('black-list-jwt', blackListJwt)