const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/servicingHours')

router.post('/post/servicing', useControllers.postServicing)
router.post('/post/servicing/data/:_id', useControllers.postServicingData)
router.post('/post/book-an-appointment', useControllers.postBookAnAppointment)
router.post('/post/book-an-appointment/disease-type/:_id', useControllers.postDiseaseType)
router.post('/post/book-an-appointment/user-appointment-data/:_id', useControllers.postUserAppointmentData)
router.post('/post/book-an-appointment/user-appointment-data/is-confirm/:_id/:id', useControllers.postConfirmAppointmentDate)
router.put('/put/servicing/:_id', useControllers.putServicing)
router.put('/put/servicing/data/:_id/:id', useControllers.putServicingData)
router.put('/put/book-an-appointment/disease-type/:_id/:jenis', useControllers.putDiseaseType)
router.put('/put/book-an-appointment/user-appointment-data/:_id/:id/is-notif', useControllers.putIsNotif)
router.put('/put/patient-registration-data/book-an-appointment/user-appointment-data/:_id/:id', useControllers.putPatientRegistration)
router.put('/put/patient-registration-data/book-an-appointment/user-appointment-data/is-confirm/:_id/:id', useControllers.putIsConfirm)
router.put('/put/patient-registration-data/book-an-appointment/user-appointment-data/is-confirm/presence/:_id/:id', useControllers.putPresence)
router.get('/get', useControllers.getAll)
router.delete('/delete/patient-registration-data/book-an-appointment/user-appointment-data/:_id/:id', useControllers.deletePatientRegistration)

module.exports = router