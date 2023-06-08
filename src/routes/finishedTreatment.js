const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/finishedTreatment')

router.post('/post/patient-registration', useControllers.postPatientFinishTreatment)
router.put('/put/rules-treatment/patient-registration/:_id', useControllers.putBioPatient)
router.get('/get', useControllers.getAll)
router.delete('/delete/items/:_id', useControllers.deleteItems)

module.exports = router