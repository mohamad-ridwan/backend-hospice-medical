const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/loket')

router.post('/post', useControllers.post)
router.post('/post/loket-info', useControllers.postLoketInfo)
router.put('/put/loket-rules/patient-queue/:_id', useControllers.putPatientQueue)
router.put('/put/loket-rules/patient-queue/presence/:_id', useControllers.putPresence)
router.get('/get', useControllers.getAll)
router.delete('/delete/lokets/:_id', useControllers.deleteLokets)

module.exports = router