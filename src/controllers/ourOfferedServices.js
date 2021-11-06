const ourOfferedServices = require('../models/ourOfferedServices')

exports.post = (req, res, next)=>{
    const title = req.body.title
    const deskripsi = req.body.deskripsi

    const post = new ourOfferedServices({
        title: title,
        deskripsi: deskripsi,
        data: []
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: "our offered services berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postData = (req, res, next)=>{
    const _id = req.params._id

    const id = `${new Date().getTime()}`
    const nameIcon = req.body.nameIcon
    const title = req.body.title
    const deskripsi = req.body.deskripsi

    const data = {
        id: id,
        nameIcon: nameIcon,
        title: title,
        deskripsi: deskripsi
    }

    ourOfferedServices.updateOne(
        {_id: _id},
        {$push: {data: data}},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({
            message: "data card our offered services berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.put = (req, res, next)=>{
    const _id = req.params._id

    const title = req.body.title
    const deskripsi = req.body.deskripsi

    ourOfferedServices.findById(_id)
    .then(post=>{
        if(!post){
            const err = new Error('data tidak ada')
            err.errorStatus = 404
            throw err
        }

        post.title = title
        post.deskripsi = deskripsi

        return post.save()
    })
    .then(result=>{
        res.status(201).json({
            message: "our offered services berhasil di update",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.putData = (req, res, next)=>{
    const _id = req.params._id
    const id = req.params.id

    const nameIcon = req.body.nameIcon
    const title = req.body.title
    const deskripsi = req.body.deskripsi

    const updateDocumentNameIcon = {
        $set: {"data.$.nameIcon": nameIcon}
    }

    const updateDocumentTitle = {
        $set: {"data.$.title": title}
    }

    const updateDocumentDeskripsi = {
        $set: {"data.$.deskripsi": deskripsi}
    }

    ourOfferedServices.updateOne({_id: _id, "data.id": id}, updateDocumentNameIcon)
    .then(result=>{
        ourOfferedServices.updateOne({_id: _id, "data.id": id}, updateDocumentTitle)
        .then(result=>{
            ourOfferedServices.updateOne({_id: _id, "data.id": id}, updateDocumentDeskripsi)
            .then(result=>{
                res.status(201).json({
                    message: "data our offered service berhasil di update",
                    data: result
                })
            })
            return result
        })
        return result
    })
    .catch(err=>console.log(err))
}