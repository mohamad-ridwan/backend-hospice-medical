const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/finishedTreatment')

router.post('/post/patient-registration', useControllers.postPatientFinishTreatment)
router.get('/get', useControllers.getAll)

module.exports = router