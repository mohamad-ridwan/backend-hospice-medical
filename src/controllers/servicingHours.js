const servicingHours = require('../models/servicingHours')

exports.postServicing = (req, res, next) => {
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
        .then(result => {
            res.status(201).json({
                message: "servicing hours berhasil di post",
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postServicingData = (req, res, next) => {
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
        { _id: _id },
        { $push: { data: data } },
    )
        .then(result => {
            res.status(201).json({
                message: 'data time servicing berhasil di post',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postBookAnAppointment = (req, res, next) => {
    const id = req.body.id

    const post = new servicingHours({
        id: id,
        diseaseType: [],
        userAppointmentData: []
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: "book an appointment berhasil di post",
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postDiseaseType = (req, res, next) => {
    const _id = req.params._id

    const jenis = req.body.jenis

    const data = {
        jenis: jenis
    }

    servicingHours.updateOne(
        { _id: _id },
        { $push: { diseaseType: data } },
        { upsert: true }
    )
        .then(result => {
            res.status(201).json({
                message: "disease type berhasil di post",
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postUserAppointmentData = (req, res, next) => {
    const _id = req.params._id

    const id = `${new Date().getTime()}`
    const patientName = req.body.patientName
    const phone = req.body.phone
    const emailAddress = req.body.emailAddress
    const dateOfBirth = req.body.dateOfBirth
    const jenisPenyakit = req.body.jenisPenyakit
    const appointmentDate = req.body.appointmentDate
    const message = req.body.message
    const patientComplaints = req.body.patientComplaints
    const submissionDate = req.body.submissionDate
    const clock = req.body.clock
    const isNotif = false

    const data = {
        id: id,
        patientName: patientName,
        phone: phone,
        emailAddress: emailAddress,
        dateOfBirth: dateOfBirth,
        jenisPenyakit: jenisPenyakit,
        appointmentDate: appointmentDate,
        message: message,
        patientComplaints: patientComplaints,
        submissionDate: submissionDate,
        clock: clock,
        isNotif,
        isConfirm: {}
    }

    servicingHours.updateOne(
        { _id: _id },
        { $push: { userAppointmentData: { $each: [data], $position: 0 } } },
        { upsert: true }
    )
        .then(result => {
            res.status(201).json({
                message: "user berhasil mengirim book an appointment",
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postConfirmAppointmentDate = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const newId = `${new Date().getTime()}`
    const message = req.body.message
    const emailAdmin = req.body.emailAdmin
    const nameAdmin = req.body.nameAdmin
    const dateConfirm = req.body.dateConfirm
    const confirmHour = req.body.confirmHour
    const treatmentHours = req.body.treatmentHours
    const nameDoctor = req.body.doctorInfo.nameDoctor
    const doctorSpecialist = req.body.doctorInfo.doctorSpecialist
    const queueNumber = req.body.queueNumber
    // const roomNumber = req.body.roomInfo.roomNumber
    const roomName = req.body.roomInfo.roomName
    const presence = req.body.presence

    const data = {
        id: newId,
        message,
        emailAdmin,
        nameAdmin,
        dateConfirm,
        confirmHour,
        treatmentHours,
        doctorInfo: {
            nameDoctor,
            doctorSpecialist
        },
        queueNumber,
        roomInfo: {
            // roomNumber,
            roomName,
        },
        presence
    }

    const updateDocument = {
        $set: { "userAppointmentData.$.isConfirm": data },
    }

    servicingHours.updateOne({ _id: _id, "userAppointmentData.id": id }, updateDocument)
        .then(result => {
            res.status(201).json({
                message: "user appointment date is confirm",
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.putServicing = (req, res, next) => {
    const _id = req.params._id

    const title = req.body.title
    const deskripsi = req.body.deskripsi

    servicingHours.findById(_id)
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
                message: "title dan deskripsi servicing hours berhasil di update",
                data: result
            })
        })
        .catch(err => next(err))
}

exports.putServicingData = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const day = req.body.day
    const time = req.body.time

    const updateDocumentDay = {
        $set: { "data.$.day": day }
    }

    const updateDocumentTime = {
        $set: { "data.$.time": time }
    }

    servicingHours.updateOne({ _id: _id, "data.id": id }, updateDocumentDay)
        .then(result => {
            servicingHours.updateOne({ _id: _id, "data.id": id }, updateDocumentTime)
                .then(result => {
                    res.status(201).json({
                        message: "data time servicing hours berhasil di update",
                        data: result
                    })
                })
            return result
        })
        .catch(err => console.log(err))
}

exports.putDiseaseType = (req, res, next) => {
    const _id = req.params._id
    const paramsJenis = req.params.jenis

    const jenis = req.body.jenis

    const updateDocument = {
        $set: { "diseaseType.$.jenis": jenis }
    }

    servicingHours.updateOne({ _id: _id, "diseaseType.jenis": paramsJenis }, updateDocument)
        .then(result => {
            res.status(201).json({
                message: "disease type berhasil di update",
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.putIsNotif = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const isNotif = true

    // const options = {
    //     'userAppointmentData.id': id
    // }

    const updateDocument = {
        $set: { "userAppointmentData.$.isNotif": isNotif }
    }

    servicingHours.updateOne({
        _id: _id,
        'userAppointmentData.id': id
    }, updateDocument)
        .then(result => {
            res.status(201).json({
                message: 'notifikasi telah update',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.putPatientRegistration = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const patientComplaints = req.body.patientComplaints
    const appointmentDate = req.body.appointmentDate
    const submissionDate = req.body.submissionDate
    const clock = req.body.clock
    const patientName = req.body.patientName
    const emailAddress = req.body.emailAddress
    const dateOfBirth = req.body.dateOfBirth
    const phone = req.body.phone

    const updateDocument = {
        $set: {
            "userAppointmentData.$[filter].patientComplaints": patientComplaints,
            "userAppointmentData.$[filter].appointmentDate": appointmentDate,
            "userAppointmentData.$[filter].submissionDate": submissionDate,
            "userAppointmentData.$[filter].clock": clock,
            "userAppointmentData.$[filter].patientName": patientName,
            "userAppointmentData.$[filter].emailAddress": emailAddress,
            "userAppointmentData.$[filter].dateOfBirth": dateOfBirth,
            "userAppointmentData.$[filter].phone": phone,
        }
    }

    const options = {
        arrayFilters: [
            { 'filter.id': id }
        ]
    }

    servicingHours.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'patient registration data is updated',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.putIsConfirm = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const newId = req.body.id
    const message = req.body.message
    const emailAdmin = req.body.emailAdmin
    const nameAdmin = req.body.nameAdmin
    const dateConfirm = req.body.dateConfirm
    const confirmHour = req.body.confirmHour
    const treatmentHours = req.body.treatmentHours
    const nameDoctor = req.body.doctorInfo.nameDoctor
    const doctorSpecialist = req.body.doctorInfo.doctorSpecialist
    const queueNumber = req.body.queueNumber
    // const roomNumber = req.body.roomInfo.roomNumber
    const roomName = req.body.roomInfo.roomName
    const presence = req.body.presence

    const updateDocument = {
        $set: {
            'userAppointmentData.$[filter].isConfirm.id': newId,
            'userAppointmentData.$[filter].isConfirm.message': message,
            'userAppointmentData.$[filter].isConfirm.emailAdmin': emailAdmin,
            'userAppointmentData.$[filter].isConfirm.nameAdmin': nameAdmin,
            'userAppointmentData.$[filter].isConfirm.dateConfirm': dateConfirm,
            'userAppointmentData.$[filter].isConfirm.confirmHour': confirmHour,
            'userAppointmentData.$[filter].isConfirm.treatmentHours': treatmentHours,
            'userAppointmentData.$[filter].isConfirm.doctorInfo.nameDoctor': nameDoctor,
            'userAppointmentData.$[filter].isConfirm.doctorInfo.doctorSpecialist': doctorSpecialist,
            'userAppointmentData.$[filter].isConfirm.queueNumber': queueNumber,
            'userAppointmentData.$[filter].isConfirm.roomInfo.roomName': roomName,
            'userAppointmentData.$[filter].isConfirm.presence': presence
        }
    }

    const options = {
        arrayFilters: [
            { 'filter.id': id }
        ]
    }

    servicingHours.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'confirm patient is updated',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.putPresence = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const presence = req.body.presence

    const updateDocument = {
        $set: { 'userAppointmentData.$[filter].isConfirm.presence': presence }
    }

    const options = {
        arrayFilters: [
            { 'filter.id': id }
        ]
    }

    servicingHours.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'presence patient is already updated',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.putAdminInfo = (req, res, next) => {
    const _id = req.params._id
    const email = req.params.email

    const emailAdmin = req.body.emailAdmin
    const nameAdmin = req.body.nameAdmin

    const updateDocument = {
        $set: {
            "userAppointmentData.$.isConfirm.emailAdmin": emailAdmin,
            "userAppointmentData.$.isConfirm.nameAdmin": nameAdmin,
        }
    }

    // const options = {
    //     "userAppointmentData.$.isConfirm.emailAdmin": email
    // }

    const options = {
        arrayFilters: [
            { "isConfirm.emailAdmin": email },
            // { "id.id": id }
        ]
    }

    servicingHours.updateMany({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'admin information is updated',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.getAll = (req, res, next) => {
    let totalItems

    servicingHours.find()
        .countDocuments()
        .then(count => {
            totalItems = count
            return servicingHours.find()
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

exports.deletePatientRegistration = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    servicingHours.updateOne(
        { _id: _id },
        { $pull: { userAppointmentData: { id: id } } },
        { upsert: true }
    )
        .then(result => {
            res.status(200).json({
                message: 'personal data info patient registration berhasil dihapus',
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.cancelRegistration = (req, res, next) => {
    const _id = req.params._id
    const id = req.params.id

    const isConfirm = {}

    const updateDocument = {
        $set: {
            'userAppointmentData.$[filter].isConfirm': isConfirm,
        }
    }

    const options = {
        arrayFilters: [
            { 'filter.id': id }
        ]
    }

    servicingHours.updateOne({ _id: _id }, updateDocument, options)
        .then(result => {
            res.status(201).json({
                message: 'cancel registration is successfully',
                data: result
            })
        })
        .catch(err => console.log(err))
}

// patient treatment
exports.postPatientTreatment = (req, res, next) => {
    const roleId = req.params.roleId

    const post = new servicingHours({
        id: roleId,
        data: []
    })

    post.save()
        .then(result => {
            res.status(201).json({
                message: `role id ${roleId} berhasil di post`,
                data: result
            })
        })
        .catch(err => console.log(err))
}

exports.postPatientRegistration = (req, res, next) => {
    const roleId = req.params.roleId

    if (roleId === 'patient-registration') {
        const id = `${new Date().getTime()}`
        const patientName = req.body.patientName
        const phone = req.body.phone
        const emailAddress = req.body.emailAddress
        const dateOfBirth = req.body.dateOfBirth
        const appointmentDate = req.body.appointmentDate
        const message = req.body.patientMessage.message
        const patientComplaints = req.body.patientMessage.patientComplaints
        const submissionDate = req.body.submissionDate.submissionDate
        const clock = req.body.submissionDate.clock

        const data = {
            id: id,
            patientName: patientName,
            phone: phone,
            emailAddress: emailAddress,
            dateOfBirth: dateOfBirth,
            appointmentDate: appointmentDate,
            patientMessage: {
                message: message,
                patientComplaints: patientComplaints,
            },
            submissionDate: {
                submissionDate: submissionDate,
                clock: clock,
            }
        }

        pushToPostData(data, "pasien berhasil mendaftarkan untuk berobat")
    } else if (roleId === 'confirmation-patients') {
        const id = `${new Date().getTime()}`
        const patientId = req.body.patientId
        const adminId = req.body.adminInfo.adminId
        const dateConfirm = req.body.dateConfirmInfo.dateConfirm
        const confirmHour = req.body.dateConfirmInfo.confirmHour
        const treatmentHours = req.body.dateConfirmInfo.treatmentHours
        const doctorId = req.body.doctorInfo.doctorId
        const roomId = req.body.roomInfo.roomId
        const queueNumber = req.body.roomInfo.queueNumber
        // const presence = req.body.roomInfo.presence

        const data = {
            id,
            patientId,
            adminInfo: {
                adminId,
            },
            dateConfirmInfo: {
                dateConfirm,
                confirmHour,
                treatmentHours
            },
            doctorInfo: {
                doctorId
            },
            roomInfo: {
                roomId,
                queueNumber,
                // presence
            }
        }

        pushToPostData(data, `confirmation dari pasien ${patientId} berhasil di buat`)
    } else if (roleId === 'drug-counter') {
        const id = `${new Date().getTime()}`
        const patientId = req.body.patientId
        const loketId = req.body.loketInfo.loketId
        const message = req.body.message
        const adminId = req.body.adminInfo.adminId
        // const presence = req.body.presence
        const submissionDate = req.body.submissionDate.submissionDate
        const submitHours = req.body.submissionDate.submitHours
        const queueNumber = req.body.queueNumber

        const data = {
            id,
            patientId,
            loketInfo: { loketId },
            message,
            adminInfo: { adminId },
            // presence,
            submissionDate: {
                submissionDate,
                submitHours
            },
            queueNumber,
            isConfirm: {confirmState: false},
        }

        pushToPostData(data, `pasien ${patientId} berhasil di tambahkan di daftar loket`)
    } else if (roleId === 'finished-treatment') {
        const id = `${new Date().getTime()}`
        const patientId = req.body.patientId
        const dateConfirm = req.body.confirmedTime.dateConfirm
        const confirmHour = req.body.confirmedTime.confirmHour
        const adminId = req.body.adminInfo.adminId
        const isCanceled = req.body.isCanceled
        const messageCancelled = req.body.messageCancelled

        const data = {
            id,
            patientId,
            confirmedTime: {
                dateConfirm,
                confirmHour
            },
            adminInfo: { adminId },
            isCanceled,
            messageCancelled
        }

        pushToPostData(data, `pasien dari ${patientId} telah berhasil menyelesaikan tahapan berobat`, patientId)
    } else if (roleId === 'room') {
        const id = `${new Date().getTime()}`
        const room = req.body.room

        const data = {
            id,
            room
        }

        pushToPostData(data, `room ${room} berhasil di buat`)
    } else if(roleId === 'info-loket'){
        const id = `${new Date().getTime()}`
        const loketName = req.body.loketName

        const data = {
            id,
            loketName
        }

        pushToPostData(data, `loket ${loketName} berhasil di buat`)
    }else {
        let err = new Error(`tidak ada id dengan ${roleId}`)
        err.errorStatus = 404
        throw err
    }

    function pushToPostData(data, message, patientId) {
        servicingHours.updateOne(
            { id: roleId },
            { $push: { data: { $each: [data], $position: 0 } } },
            { upsert: true }
        )
            .then(result => {
                res.status(201).json({
                    message: message,
                    data: result,
                    patientId: patientId
                })
            })
            .catch(err => console.log(err))
    }
}

// update patient treatment
exports.updatePatientRegistration = (req, res, next) => {
    const roleId = req.params.roleId
    const id = req.params.id

    if (roleId === 'patient-registration') {
        const patientName = req.body.patientName
        const phone = req.body.phone
        const emailAddress = req.body.emailAddress
        const dateOfBirth = req.body.dateOfBirth
        const appointmentDate = req.body.appointmentDate
        const message = req.body.patientMessage.message
        const patientComplaints = req.body.patientMessage.patientComplaints
        const submissionDate = req.body.submissionDate.submissionDate
        const clock = req.body.submissionDate.clock

        const data = {
            "data.$[filter].patientName": patientName,
            "data.$[filter].phone": phone,
            "data.$[filter].emailAddress": emailAddress,
            "data.$[filter].dateOfBirth": dateOfBirth,
            "data.$[filter].appointmentDate": appointmentDate,
            "data.$[filter].patientMessage.message": message,
            "data.$[filter].patientMessage.patientComplaints": patientComplaints,
            "data.$[filter].submissionDate.submissionDate": submissionDate,
            "data.$[filter].submissionDate.clock": clock,
        }

        const updateDocument = {
            $set: data
        }

        const options = {
            arrayFilters: [
                { 'filter.id': id }
            ]
        }

        pushToUpdateData(updateDocument, options, `data pasien dari pasien ${id} telah berhasil di update`)
    }else if(roleId === 'confirmation-patients'){
        const patientId = req.body.patientId
        const adminId = req.body.adminInfo.adminId
        const dateConfirm = req.body.dateConfirmInfo.dateConfirm
        const confirmHour = req.body.dateConfirmInfo.confirmHour
        const treatmentHours = req.body.dateConfirmInfo.treatmentHours
        const doctorId = req.body.doctorInfo.doctorId
        const roomId = req.body.roomInfo.roomId
        const queueNumber = req.body.roomInfo.queueNumber
        // const presence = req.body.roomInfo.presence

        const data = {
            "data.$[filter].patientId": patientId,
            "data.$[filter].adminInfo.adminId": adminId,
            "data.$[filter].dateConfirmInfo.dateConfirm": dateConfirm,
            "data.$[filter].dateConfirmInfo.confirmHour": confirmHour,
            "data.$[filter].dateConfirmInfo.treatmentHours": treatmentHours,
            "data.$[filter].doctorInfo.doctorId": doctorId,
            "data.$[filter].roomInfo.roomId": roomId,
            "data.$[filter].roomInfo.queueNumber": queueNumber,
            // "data.$[filter].roomInfo.presence": presence,
        }

        const updateDocument = {
            $set: data
        }

        const options = {
            arrayFilters: [
                { 'filter.id': id }
            ]
        }

        pushToUpdateData(updateDocument, options, `data konfirmasi pasien dari pasien ${patientId} telah berhasil di update`)
    }else if(roleId === 'drug-counter'){
        const patientId = req.body.patientId
        const loketId = req.body.loketInfo.loketId
        const message = req.body.message
        const adminId = req.body.adminInfo.adminId
        // const presence = req.body.presence
        const submissionDate = req.body.submissionDate.submissionDate
        const submitHours = req.body.submissionDate.submitHours
        const queueNumber = req.body.queueNumber
        const isConfirm = req.body.isConfirm

        const data = {
            "data.$[filter].patientId": patientId,
            "data.$[filter].loketInfo.loketId": loketId,
            "data.$[filter].message": message,
            "data.$[filter].adminInfo.adminId": adminId,
            // "data.$[filter].presence": presence,
            "data.$[filter].submissionDate.submissionDate": submissionDate,
            "data.$[filter].submissionDate.submitHours": submitHours,
            "data.$[filter].queueNumber": queueNumber,
            "data.$[filter].isConfirm": isConfirm,
        }

        const updateDocument = {
            $set: data
        }

        const options = {
            arrayFilters: [
                { 'filter.id': id }
            ]
        }

        pushToUpdateData(updateDocument, options, `data pasien di loket dari pasien ${patientId} berhasil di update`, patientId)
    }else if(roleId === 'finished-treatment'){
        const patientId = req.body.patientId
        const dateConfirm = req.body.confirmedTime.dateConfirm
        const confirmHour = req.body.confirmedTime.confirmHour
        const adminId = req.body.adminInfo.adminId
        const isCanceled = req.body.isCanceled
        const messageCancelled = req.body.messageCancelled

        const data = {
            "data.$[filter].patientId": patientId,
            "data.$[filter].confirmedTime.dateConfirm": dateConfirm,
            "data.$[filter].confirmedTime.confirmHour": confirmHour,
            "data.$[filter].adminInfo.adminId": adminId,
            "data.$[filter].isCanceled": isCanceled,
            "data.$[filter].messageCancelled": messageCancelled
        }

        const updateDocument = {
            $set: data
        }

        const options = {
            arrayFilters: [
                { 'filter.id': id }
            ]
        }

        pushToUpdateData(updateDocument, options, `data pasien yang telah menyelesaikan berobat dari pasien ${patientId} berhasil di update`)
    }else if(roleId === 'room'){
        const room = req.body.room

        const data = {
            "data.$[filter].room": room
        }

        const updateDocument = {
            $set: data
        }

        const options = {
            arrayFilters: [
                { 'filter.id': id }
            ]
        }

        pushToUpdateData(updateDocument, options, `room ${id} berhasil di update`)
    }else if(roleId === 'info-loket'){
        const loketName = req.body.loketName

        const data = {
            "data.$[filter].loketName": loketName
        }

        const updateDocument = {
            $set: data
        }

        const options = {
            arrayFilters: [
                { 'filter.id': id }
            ]
        }

        pushToUpdateData(updateDocument, options, `loket ${id} berhasil di update`)
    }else {
        let err = new Error(`tidak ada id dengan ${roleId}`)
        err.errorStatus = 404
        throw err
    }

    function pushToUpdateData(
        updateDocument,
        options,
        message,
        patientId
    ) {
        servicingHours.updateOne(
            { id: roleId },
            updateDocument,
            options
        )
            .then(result => {
                res.status(201).json({
                    message: message,
                    data: result,
                    id: id,
                    patientId
                })
            })
            .catch(err => console.log(err))
    }
}

// delete patient treatment
exports.deleteDataPatientOfPatientTreatment = (req, res, next)=>{
    const roleId = req.params.roleId
    const id = req.params.id
    const patientId = req.params.patientId

    servicingHours.updateOne(
        { id: roleId },
        { $pull: { data: { id: id } } },
        { upsert: true }
    )
        .then(result => {
            res.status(200).json({
                message: `data pasien ${id} dari roleId:${roleId} telah berhasil di hapus`,
                data: result,
                id,
                patientId
            })
        })
        .catch(err => console.log(err))
}