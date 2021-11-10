const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/doctors')

router.post('/post', useControllers.post)
router.post('/post/data/:_id', useControllers.postData)
router.post('/post/data/medsos/:_id/:id', useControllers.postMedsos)
router.put('/put/:_id', useControllers.put)
router.put('/put/data/:property/:_id/:id', useControllers.putData)
router.get('/get', useControllers.get)

module.exports = router