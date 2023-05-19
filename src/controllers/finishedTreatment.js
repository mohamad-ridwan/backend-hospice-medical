const finishedTreatment = require('../models/finishedTreatment')

exports.postPatientFinishTreatment = (req, res, next)=>{
    const id = req.body.id
    // rulesTreatment = 'patient-registration'
    const rulesTreatment = req.body.rulesTreatment
    const patientId = req.body.patientId
    const patientName = req.body.patientName
    const patientEmail = req.body.patientEmail
    const phone = req.body.phone
    const confirmHour = req.body.confirmedTime.confirmHour
    const dateConfirm = req.body.confirmedTime.dateConfirm
    const emailAdmin = req.body.adminInfo.emailAdmin
    const nameAdmin = req.body.adminInfo.nameAdmin

    const post = new finishedTreatment({
        id,
        rulesTreatment,
        patientId,
        patientName,
        patientEmail,
        phone,
        confirmedTime:{
            confirmHour,
            dateConfirm
        },
        adminInfo:{
            emailAdmin,
            nameAdmin
        }
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: 'successful post finished treatment of patient',
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.getAll = (req, res, next)=>{
    let totalItems
    
    finishedTreatment.find()
    .countDocuments()
    .then(count=>{
        totalItems = count
        return finishedTreatment.find()
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