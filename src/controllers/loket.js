const loket = require('../models/loket')

exports.post = (req, res, next)=>{
    const id = req.body.id
    // patient-queue
    const loketRules = req.body.loketRules
    const loketName = req.body.loketName
    const patientId = req.body.patientId
    const jenisPenyakit = req.body.jenisPenyakit
    const patientName = req.body.patientName
    const emailAddress = req.body.emailAddress
    const phone = req.body.phone
    const queueNumber = req.body.queueNumber
    const message = req.body.message
    const emailAdmin = req.body.emailAdmin
    const isNotif = false

    const post = new loket({
        id,
        loketRules,
        loketName,
        patientId,
        jenisPenyakit,
        patientName,
        emailAddress,
        phone,
        queueNumber,
        message,
        emailAdmin,
        isNotif,
        isConfirm: {}
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'berhasil post data patient ke loket',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postLoketInfo = (req, res, next)=>{
    const id = req.body.id
    // info-loket
    const loketRules = req.body.loketRules
    const loketInfo = []

    const post = new loket({
        id,
        loketRules,
        loketInfo
    })
    
    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'berhasil post loket info',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.getAll = (req, res, next)=>{
    let totalItems
    
    loket.find()
    .countDocuments()
    .then(count=>{
        totalItems = count
        return loket.find()
    })
    .then(result=>{
        res.status(200).json({
            message: "semua data di dapatkan",
            data: result,
            totalData: totalItems
        })
    })
    .catch(err=>next(err))
}