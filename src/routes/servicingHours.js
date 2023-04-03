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
router.get('/get', useControllers.getAll)

module.exports = router