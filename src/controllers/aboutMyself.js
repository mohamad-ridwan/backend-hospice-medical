const aboutMyself = require('../models/aboutMyself')

exports.post = (req, res, next)=>{
    const id = req.body.id
    const title = req.body.title
    const deskripsi = req.body.deskripsi
    const image = req.file.path

    const post = new aboutMyself({
        id: id,
        title: title,
        deskripsi: deskripsi,
        image: image,
        dataBio: []
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: "about myself berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postDataBio = (req, res, next)=>{
    const _id = req.params._id

    const id = `${new Date().getTime()}`
    const nameIcon = req.body.nameIcon
    const title = req.body.title
    const deskripsi = req.body.deskripsi

    const data = {
        id: id,
        nameIcon : nameIcon,
        title: title,
        deskripsi: deskripsi
    }

    aboutMyself.updateOne(
        {_id: _id},
        {$push: {dataBio: data}},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({
            message: "data bio berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.put = (req, res, next)=>{
    const _id = req.params._id

    const title = req.body.title
    const deskripsi = req.body.deskripsi
    const image = req.file.path

    aboutMyself.findById(_id)
    .then(post=>{
        if(!post){
            const err = new Error('data tidak ada')
            err.errorStatus = 404
            throw err
        }

        post.title = title
        post.deskripsi = deskripsi
        post.image = image

        return post.save()
    })
    .then(result=>{
        res.status(201).json({
            message: "about myself berhasil di update",
            data: result
        })
    })
    .catch(err=>next(err))
}

exports.putDataBio = (req, res, next)=>{
    const _id = req.params._id
    const id = req.params.id

    const nameIcon = req.body.nameIcon
    const title = req.body.title
    const deskripsi = req.body.deskripsi

    const updateDocumentNameIcon = {
        $set: {"dataBio.$.nameIcon": nameIcon}
    }

    const updateDocumentTitle = {
        $set: {"dataBio.$.title": title}
    }

    const updateDocumentDeskripsi = {
        $set: {"dataBio.$.deskripsi": deskripsi}
    }

    aboutMyself.updateOne({_id: _id, "dataBio.id": id}, updateDocumentNameIcon)
    .then(result=>{
        aboutMyself.updateOne({_id: _id, "dataBio.id": id}, updateDocumentTitle)
        .then(result=>{
            aboutMyself.updateOne({_id: _id, "dataBio.id": id}, updateDocumentDeskripsi)
            .then(result=>{
                res.status(201).json({
                    message: "data bio berhasil di update",
                    data: result
                })
            })
            return result
        })
        return result
    })
    .catch(err=>console.log(err))
}

exports.getAll = (req, res, next)=>{
    let totalItems
    
    aboutMyself.find()
    .countDocuments()
    .then(count=>{
        totalItems = count
        return aboutMyself.find()
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