const servicingHours = require('../models/servicingHours')

exports.postServicing = (req, res, next)=>{
    const id = req.body.id
    const title = req.body.title
    const deskripsi = req.body.deskripsi

    const post = new servicingHours({
        id: id,
        title: title,
        deskripsi: deskripsi,
        data: []
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: "servicing hours berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postServicingData = (req, res, next)=>{
    const _id = req.params._id

    const id = `${new Date().getTime()}`
    const day = req.body.day
    const time = req.body.time

    const data = {
        id: id,
        day: day,
        time: time
    }

    servicingHours.updateOne(
        {_id: _id},
        {$push: {data: data}},
    )
    .then(result=>{
        res.status(201).json({
            message: 'menu collapse berhasil di post',
            data : result
        })
    })
    .catch(err=>console.log(err))
}

exports.postBookAnAppointment = (req, res, next)=>{
    
}