const doctors = require('../models/doctors')

exports.post = (req, res, next) => {
    const title = req.body.title
    const deskripsi = req.body.deskripsi

    const post = new doctors({
        title: title,
        deskripsi: deskripsi,
        data: []
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: "data page doctors berhasil di post",
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postData = (req, res, next) => {
    const id = req.params.id

    // room
    // room : 123

    // object medsos
    // {id: 123, nameIcon: fab fa-twitter, elementIcon: <svg/>, path: twitter.com, medsosName: twitter}[]

    // object doctorSchedule
    // {id: 123, dayName: Senin, practiceHours: 08:00 - 12:00}[]

    // holiday schedule
    // {id: 123, date: new Date}

    const timeId = `${new Date().getTime()}`
    const image = req.body.image
    const name = req.body.name
    const deskripsi = req.body.deskripsi
    const email = req.body.email
    const phone = req.body.phone
    const room = req.body.room
    const medsos = req.body.medsos
    const doctorSchedule = req.body.doctorSchedule
    const holidaySchedule = req.body.holidaySchedule

    const data = {
        id: timeId,
        image,
        name,
        deskripsi,
        email,
        phone,
        room,
        medsos,
        doctorSchedule,
        holidaySchedule
    }

    doctors.updateOne(
        { id: id },
        { $push: { data: data } },
        { upsert: true }
    )
        .then(result => {
            res.status(201).json({
                message: "data profile doctors berhasil di post",
                data: result
            })
        })
        .catch(err => console.log(err))
}

// put profile doctor
exports.putProfileDoctor = (req, res, next) => {
    const roleId = req.params.roleId
    const id = req.params.id

    if (roleId === 'doctor') {
        const image = req.body.image
        const name = req.body.name
        const deskripsi = req.body.deskripsi
        const email = req.body.email
        const phone = req.body.phone
        const room = req.body.room
        const medsos = req.body.medsos
        const doctorSchedule = req.body.doctorSchedule
        const holidaySchedule = req.body.holidaySchedule

        function keys(keyName){
            return `data.$[filter].${keyName}`
        }

        const data = {
            [keys('image')] : image,
            [keys('name')]: name,
            [keys('deskripsi')]: deskripsi,
            [keys('email')]: email,
            [keys('phone')]: phone,
            [keys('room')]: room,
            [keys('medsos')]: medsos,
            [keys('doctorSchedule')]: doctorSchedule,
            [keys('holidaySchedule')]: holidaySchedule,
        }

        const updateDocument = {
            $set: data
        }

        const options = {
            arrayFilters: [
                { 'filter.id': id }
            ]
        }

        pushToUpdateData(
            updateDocument,
            options,
            `data dokter dari id:${id} telah berhasil di update`
        )
    } else {
        let err = new Error(`tidak ada id dengan ${roleId}`)
        err.errorStatus = 404
        throw err
    }

    function pushToUpdateData(
        updateDocument,
        options,
        message
    ) {
        doctors.updateOne(
            { id: roleId },
            updateDocument,
            options
        )
            .then(result => {
                res.status(201).json({
                    message: message,
                    data: result,
                    doctorId: id
                })
            })
            .catch(err => console.log(err))
    }
}

exports.postMedsos = (req, res, next) => {
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
        $push: { "data.$.medsos": data },
        upsert: true
    }

    doctors.updateOne({ _id: _id, "data.id": id }, updateDocument)
        .then(result => {
            res.status(201).json({
                message: "akun medsos doctors berhasil di post",
                data: result
            })
        })
}

exports.put = (req, res, next) => {
    const _id = req.params._id

    const title = req.body.title
    const deskripsi = req.body.deskripsi

    doctors.findById(_id)
        .then(post => {
            if (!post) {
                const err = new Error('data tidak ada')
                err.errorStatus = 404
                throw err
            }

            post.title = title
            post.deskripsi = deskripsi

            return post.save()
        })
        .then(result => {
            res.status(201).json({
                message: "data page doctors berhasil di update",
                data: result
            })
        })
        .catch(err => next(err))
}

exports.putData = (req, res, next) => {
    const property = req.params.property
    const _id = req.params._id
    const id = req.params.id

    const image = !req.file ? null : req.file.path
    const name = req.body.name
    const deskripsi = req.body.deskripsi

    const updateDocumentImage = {
        $set: { "data.$.image": image }
    }
    const updateDocumentName = {
        $set: { "data.$.name": name }
    }
    const updateDocumentDeskripsi = {
        $set: { "data.$.deskripsi": deskripsi }
    }

    function update(document) {
        doctors.updateOne({ _id: _id, "data.id": id }, document)
            .then(result => {
                res.status(201).json({
                    message: `${property} profile doctors berhasil di update`,
                    data: result
                })
            })
            .catch(err => console.log(err))
    }

    if (property === "image") {
        if (image === null) {
            return res.status(500).json({
                message: "error no image files"
            })
        } else {
            update(updateDocumentImage)
        }
    } else if (property === "name") {
        update(updateDocumentName)
    } else if (property === "deskripsi") {
        update(updateDocumentDeskripsi)
    } else {
        return res.status(404).json({
            error: `/v10/doctors/put/data/${property}/${_id}/${id}`,
            message: `tidak ada property yang bernama ${property}`
        })
    }
}

exports.putMedsos = (req, res, next) => {
    const property = req.params.property
    const _id = req.params._id
    const id = req.params.id
    const idMedsos = req.params.idMedsos

    const nameIcon = req.body.nameIcon
    const path = req.body.path

    const updateDocumentNameIcon = {
        $set: { "data.$[outer].medsos.$[inner].nameIcon": nameIcon }
    }
    const updateDocumentPath = {
        $set: { "data.$[outer].medsos.$[inner].path": path }
    }

    const options = {
        arrayFilters: [
            { "outer.id": id },
            { "inner.id": idMedsos }
        ]
    }

    function update(document, filters) {
        doctors.updateOne({ _id: _id }, document, filters)
            .then(result => {
                res.status(201).json({
                    message: `${property} profile doctors berhasil di update`,
                    data: result
                })
            })
            .catch(err => console.log(err))
    }

    if (property === "nameIcon") {
        update(updateDocumentNameIcon, options)
    } else if (property === "path") {
        update(updateDocumentPath, options)
    } else {
        return res.status(404).json({
            error: `/v10/doctors/put/profile-doctors/data/medsos/${property}/${id}`,
            message: `tidak ada property yang bernama ${property}`
        })
    }
}

exports.get = (req, res, next) => {
    let totalItems

    doctors.find()
        .countDocuments()
        .then(count => {
            totalItems = count
            return doctors.find()
        })
        .then(result => {
            res.status(200).json({
                message: "semua data di dapatkan",
                data: result,
                totalData: totalItems
            })
        })
        .catch(err => next(err))
}

// delete profile doctor
exports.deleteProfileDoctor = (req, res, next) => {
    const roleId = req.params.roleId
    const id = req.params.id

    doctors.updateOne(
        { id: roleId },
        { $pull: { data: { id: id } } },
        { upsert: true }
    )
        .then(result => {
            res.status(200).json({
                message: `data dokter ${id} dari role ${roleId} telah berhasil di hapus`,
                data: result
            })
        })
        .catch(err => console.log(err))
}