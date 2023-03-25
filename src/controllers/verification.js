const verificationModel = require('../models/verification')

exports.post = (req, res)=>{
    const id = req.body.id
    const userId = req.body.userId
    const verification = req.body.verification

    const post = new verificationModel({
        id: id,
        userId: userId,
        verification:{
            token: verification.token,
            date: verification.date
        }
    })
    
    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'user mengirimkan verifikasi',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.get = (req, res, next) => {
    let totalItems

    verificationModel.find()
        .countDocuments()
        .then(count => {
            totalItems = count
            return verificationModel.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'data verifikasi',
                data: result,
                totalData: totalItems
            })
        })
        .catch(err => next(err))
}

exports.put = (req, res, next)=>{
    const userId = req.params.userId

    const {token, date} = req.body.verification

    verificationModel.findOne({userId: userId})
    .then(post=>{
        if(!post){
            const err = new Error('data tidak ada')
                err.errorStatus = 404
                throw err
        }

        post.verification.token = token
        post.verification.date = date

        return post.save()
    })
    .then(result=>{
        res.status(201).json({
            message: `token verification is updated`,
            data: result
        })
    })
    .catch(err=>next(err))
}

exports.delete = (req, res, next)=>{
    const userId = req.params.userId

    verificationModel.deleteOne({userId: userId})
    .then(result=>{
        res.status(200).json({
            message: `success delete verification user of ${userId}`,
            data: result
        })
    })
    .catch(err=>console.log(err))
}