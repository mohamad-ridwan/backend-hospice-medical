const express = require('express')

const router = express.Router()

const userControllers = require('../controllers/users')

router.post('/post', userControllers.post)
router.put('/put/:userId', userControllers.putIsVerification)
router.put('/put/user/:id', userControllers.putUser)
router.get('/get', userControllers.get)

module.exports = router