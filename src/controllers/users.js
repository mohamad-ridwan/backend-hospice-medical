const users = require('../models/users')

exports.post = (req, res, next) => {
    const id = `${new Date().getTime()}`
    const name = req.body.name
    const email = req.body.email
    const image = req.file.path
    const password = req.body.password

    const post = new users({
        id: id,
        name: name,
        email: email,
        image: image,
        password: password
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'user berhasil post data',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.get = (req, res, next)=>{
    let totalItems

    users.find()
    .countDocuments()
    .then(count=>{
        totalItems = count
        return users.find()
    })
    .then(result=>{
        res.status(200).json({
            message: 'semua di dapatkan',
            data: result,
            totalData: totalItems
        })
    })
    .catch(err=>next(err))
}