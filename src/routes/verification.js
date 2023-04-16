const express = require('express')

const router = express.Router()

const verificationControllers = require('../controllers/verification')

router.post('/post', verificationControllers.post)
router.get('/get', verificationControllers.get)
router.put('/put/:userId', verificationControllers.put)
// verif create-new-password
router.post('/post/forgot-password/create-new-password/:userId', verificationControllers.jwtCreateNewPassword)
router.get('/get/forgot-password/create-new-password', verificationControllers.getTokenJwt)
router.delete('/delete/:userId', verificationControllers.delete)

module.exports = router