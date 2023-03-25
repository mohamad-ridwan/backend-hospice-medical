const express = require('express')

const router = express.Router()

const verificationControllers = require('../controllers/verification')

router.post('/post', verificationControllers.post)
router.get('/get', verificationControllers.get)
router.put('/put/:userId', verificationControllers.put)
router.delete('/delete/:userId', verificationControllers.delete)

module.exports = router