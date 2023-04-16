const blackListJwt = require('../models/blackListJwt')

exports.post = (req, res, next)=>{
    const id = req.body.id
    const token = req.body.token

    const post = new blackListJwt({
        id: id,
        token: token
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'token is created',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.get = (req, res, next)=>{
    let totalItems

    blackListJwt.find()
        .countDocuments()
        .then(count => {
            totalItems = count
            return blackListJwt.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'semua data token didapatkan',
                data: result,
                totalData: totalItems
            })
        })
        .catch(err => next(err))
}