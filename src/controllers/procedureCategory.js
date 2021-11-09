const procedureCategory = require('../models/procedureCategory')

exports.postProcedureCategory = (req, res, next)=>{
    const title = req.body.title
    const deskripsi = req.body.deskripsi

    const post = new procedureCategory({
        title: title,
        deskripsi: deskripsi,
        dataImg: []
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: "procedure category berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postDataImg = (req, res, next)=>{
    const _id = req.params._id

    const id = `${new Date().getTime()}`
    const title = req.body.title
    const image = req.file.path

    const data = {
        id: id,
        title: title,
        image: image
    }

    procedureCategory.updateOne(
        {_id: _id},
        {$push: {dataImg: data}},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({
            message: "data img berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.putProcedureCategory = (req, res, next)=>{
    const _id = req.params._id

    const title = req.body.title
    const deskripsi = req.body.deskripsi

    procedureCategory.findById(_id)
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
            message: "procedure category berhasil di update",
            data: result
        })
    })
    .catch(err=>next(err))
}

exports.putDataImg = (req, res, next)=>{
    const _id = req.params._id
    const id = req.params.id
    
    const title = req.body.title
    const image = req.file.path

    const updateDocumentTitle = {
        $set: {"dataImg.$.title": title}
    }

    const updateDocumentImage = {
        $set: {"dataImg.$.image": image}
    }

    procedureCategory.updateOne({_id: _id, "dataImg.id": id}, updateDocumentTitle)
    .then(result=>{
        procedureCategory.updateOne({_id: _id, "dataImg.id": id}, updateDocumentImage)
        .then(result=>{
            res.status(201).json({
                message: "data img berhasil di update",
                data: result
            })
        })
        .catch(err=>console.log(err))
        return result
    })
    .catch(err=>console.log(err))
}

exports.getAll = (req, res, next)=>{
    let totalItems
    
    procedureCategory.find()
    .countDocuments()
    .then(count=>{
        totalItems = count
        return procedureCategory.find()
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