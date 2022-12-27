const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blog = new Schema({
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
    paragraphSatu :{
        type: String
    },
    paragraphBeforeHighlight:{
        type: String
    },
    paragraphHighlight:{
        type: String
    },
    paragraphDua:{
        type: String
    },
    category:{
        type: String
    },
    date: {
        type: String
    },
    path:{
        type: String
    },
    comments: {
        type: Array
    },
    data: {
        type: Array
    },
    imageDetailContent: {
        type: Object
    },
    idCategory:{
        type: String
    },
    clock:{
        type: String
    },
    idUserComment: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    subject:{
        type: String
    },
    message: {
        type: String
    },
    times: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('blog', blog)