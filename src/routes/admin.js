const express = require('express')

const router = express.Router()

const adminControllers = require('../controllers/admin')

router.post('/post', adminControllers.post)
router.put('/put/:adminId', adminControllers.putIsVerification)
router.put('/put/admin/:id', adminControllers.putAdmin)
router.get('/get', adminControllers.get)

module.exports = router