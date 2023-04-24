const verificationModel = require('../models/verification')
const users = require('../models/users')
const admin = require('../models/admin')
const jwt = require('jsonwebtoken')

exports.post = (req, res) => {
    const id = req.body.id
    const userId = req.body.userId
    const verification = req.body.verification

    const post = new verificationModel({
        id: id,
        userId: userId,
        verification: {
            token: verification.token,
            date: verification.date
        }
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'user mengirimkan verifikasi',
                data: result
            })
        })
        .catch(err => console.log(err))
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

exports.put = (req, res, next) => {
    const userId = req.params.userId

    const { token, date } = req.body.verification

    verificationModel.findOne({ userId: userId })
        .then(post => {
            if (!post) {
                const err = new Error('data tidak ada')
                err.errorStatus = 404
                throw err
            }

            post.verification.token = token
            post.verification.date = date

            return post.save()
        })
        .then(result => {
            res.status(201).json({
                message: `token verification is updated`,
                data: result
            })
        })
        .catch(err => next(err))
}

// verif create-new-password
exports.jwtCreateNewPassword = async (req, res, next) => {
    const userId = req.params.userId
    const role = req.params.role
    const checkUser = await users.findOne({ id: userId })
    const checkAdmin = await admin.findOne({ id: userId })

    if (role === 'user' && !checkUser) {
        return res.status(400).json({ error: 'user not found!' })
    }else if(role === 'admin' && !checkAdmin){
        return res.status(400).json({ error: 'admin not found!' })
    }

    const token = jwt.sign({
        userData: {
            _id: checkUser._id,
            id: checkUser.id,
            name: checkUser.name,
            email: checkUser.email,
            image: checkUser.image,
            password: checkUser.password,
            isVerification: checkUser.isVerification
        }
    }, process.env.TOKEN_SECRET, { expiresIn: '1h' })

    res.header("Jwt-Token", token).json({
        error: null,
        token: token
    })
}

exports.getTokenJwt = async (req, res, next) => {
    const token = req.header('Jwt-Token')

    if (!token) {
        return res.status(401).json({ error: 'Invalid request!' })
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)

        res.status(200).json({
            error: null,
            data: verified
        })
    } catch (err) {
        res.status(400).json({ error: 'Invalid token or token is expired!' })
    }
}

exports.delete = (req, res, next) => {
    const userId = req.params.userId

    verificationModel.deleteOne({ userId: userId })
        .then(result => {
            res.status(200).json({
                message: `success delete verification user of ${userId}`,
                data: result
            })
        })
        .catch(err => console.log(err))
}