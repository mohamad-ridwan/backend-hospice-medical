const admin = require('../models/admin')

exports.post = (req, res, next) => {
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const image = req.body.image
    const password = req.body.password
    const isVerification = false

    const post = new admin({
        id: id,
        name: name,
        email: email,
        image: image,
        password: password,
        isVerification: isVerification
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'admin berhasil post data',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.putIsVerification = (req, res, next) => {
    const userId = req.params.adminId

    const isVerification = req.body.isVerification

    admin.findOne({id: userId})
        .then(post => {
            if (!post) {
                const err = new Error('data tidak ada')
                err.errorStatus = 404
                throw err
            }

            post.isVerification = isVerification

            return post.save()
        })
        .then(result => {
            res.status(201).json({
                message: `admin ${userId} berhasil di verifikasi`,
                data: result
            })
        })
        .catch(err => next(err))
}

exports.putAdmin = (req, res, next)=>{
    const id = req.params.id

    const name = req.body.name
    const image = req.body.image
    const password = req.body.password

    admin.findOne({id: id})
    .then(post=>{
        if (!post) {
            const err = new Error('data tidak ada')
            err.errorStatus = 404
            throw err
        }

        post.name = name
        post.image = image
        post.password = password

        return post.save()
    })
    .then(result => {
        res.status(201).json({
            message: `admin ${id} berhasil di update`,
            data: result
        })
    })
    .catch(err => next(err))
}

exports.get = (req, res, next) => {
    let totalItems

    admin.find()
        .countDocuments()
        .then(count => {
            totalItems = count
            return admin.find()
        })
        .then(result => {
            res.status(200).json({
                message: 'semua di dapatkan',
                data: result,
                totalData: totalItems
            })
        })
        .catch(err => next(err))
}