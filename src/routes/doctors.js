const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/doctors')

router.post('/post', useControllers.post)
router.post('/post/data/:id', useControllers.postData)
router.put('/put/role/:roleId/data/:id', useControllers.putProfileDoctor)
router.post('/post/data/medsos/:_id/:id', useControllers.postMedsos)
router.put('/put/:_id', useControllers.put)
router.put('/put/data/:property/:_id/:id', useControllers.putData)
router.put('/put/profile-doctors/data/data-medsos/:property/:_id/:id/:idMedsos', useControllers.putMedsos)
router.get('/get', useControllers.get)
// delete profile doctor
router.delete('/delete/role/:roleId/data/:id', useControllers.deleteProfileDoctor)

module.exports = router