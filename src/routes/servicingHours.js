const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/servicingHours')

router.post('/post/servicing', useControllers.postServicing)
router.post('/post/servicing/data/:_id', useControllers.postServicingData)
router.post('/post/book-an-appointment', useControllers.postBookAnAppointment)

module.exports = router