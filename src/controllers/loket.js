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
    const isConfirm = req.body.isConfirm

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
        isConfirm
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

exports.putPatientQueue = (req, res, next)=>{
    const _id = req.params._id

    const id = req.body.id
    const dateConfirm = req.body.dateConfirm
    const confirmHour = req.body.confirmHour
    const emailAdmin = req.body.emailAdmin
    const nameAdmin = req.body.nameAdmin
    const confirmState = req.body.confirmState
    const paymentMethod = req.body.paymentInfo.paymentMethod
    const bpjsNumber = req.body.paymentInfo.bpjsNumber
    const totalCost = req.body.paymentInfo.totalCost

    const data = {
        id,
        dateConfirm,
        confirmHour,
        emailAdmin,
        nameAdmin,
        confirmState,
        paymentInfo:{
            paymentMethod,
            bpjsNumber,
            totalCost
        }
    }

    const updateDocument = {
        $set:{'isConfirm': data}
    }

    loket.updateOne({_id: _id}, updateDocument)
    .then(result=>{
        res.status(201).json({
            message: 'patient in the counter is confirmed',
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

exports.deleteLokets = (req, res, next)=>{
    const _id = req.params._id
    
    loket.deleteOne({_id: _id})
    .then(result=>{
        res.status(200).json({
            message: 'success delete in the loket',
            data: result
        })
    })
    .catch(err=>console.log(err))
}