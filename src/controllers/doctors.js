const doctors = require('../models/doctors')

exports.post = (req, res, next)=>{
    const title = req.body.title
    const deskripsi = req.body.deskripsi

    const post = new doctors({
        title: title,
        deskripsi: deskripsi,
        data: []
    })

    post.save()
    .then(result=>{
        res.status(201).json({
            message: "data page doctors berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postData = (req, res, next)=>{
    const _id = req.params._id

    const id = `${new Date().getTime()}`
    const image = req.file.path
    const name = req.body.name
    const deskripsi = req.body.deskripsi

    const data = {
        id: id,
        image: image,
        name: name,
        deskripsi: deskripsi,
        medsos: []
    }

    doctors.updateOne(
        {_id: _id},
        {$push: {data: data}},
        {upsert: true}
    )
    .then(result=>{
        res.status(201).json({
            message: "data profile doctors berhasil di post",
            data: result
        })
    })
    .catch(err=>console.log(err))
}

exports.postMedsos = (req, res, next)=>{
    const _id = req.params._id
    const id = req.params.id

    const id2 = `${new Date().getTime()}`
    const nameIcon = req.body.nameIcon
    const path = req.body.path

    const data = {
        id: id2,
        nameIcon: nameIcon,
        path: path
    }

    const updateDocument = {
        $push: {"data.$.medsos": data},
        upsert: true
    }

    doctors.updateOne({_id: _id, "data.id": id}, updateDocument)
    .then(result=>{
        res.status(201).json({
            message: "akun medsos doctors berhasil di post",
            data: result
        })
    })
}

exports.put = (req, res, next)=>{
    const _id = req.params._id
    
    const title = req.body.title
    const deskripsi = req.body.deskripsi

    doctors.findById(_id)
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
            message: "data page doctors berhasil di update",
            data: result
        })
    })
    .catch(err=>next(err))
}

exports.putData = (req, res, next)=>{
    const property = req.params.property
    const _id = req.params._id
    const id = req.params.id

    const image = !req.file ? null : req.file.path
    const name = req.body.name
    const deskripsi = req.body.deskripsi

    const updateDocumentImage = {
        $set: {"data.$.image": image}
    }
    const updateDocumentName = {
        $set: {"data.$.name": name}
    }
    const updateDocumentDeskripsi = {
        $set: {"data.$.deskripsi": deskripsi}
    }

    function update(document){
        doctors.updateOne({_id: _id, "data.id": id}, document)
        .then(result=>{
            res.status(201).json({
                message: `${property} profile doctors berhasil di update`,
                data: result
            })
        })
        .catch(err=>console.log(err))
    }

    if(property === "image"){
        if(image === null){
            return res.status(500).json({
                message: "error no image files"
            })
        }else{
            update(updateDocumentImage)
        }
    } else if(property === "name"){
        update(updateDocumentName)
    }else if(property === "deskripsi"){
        update(updateDocumentDeskripsi)
    }else {
        return res.status(404).json({
            error: `/v10/doctors/put/data/${property}/${_id}/${id}`,
            message: `tidak ada property yang bernama ${property}`
        })
    }
}

exports.get = (req, res, next)=>{
    let totalItems
    
    doctors.find()
    .countDocuments()
    .then(count=>{
        totalItems = count
        return doctors.find()
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