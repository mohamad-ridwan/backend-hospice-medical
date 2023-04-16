const express = require('express')

const router = express.Router()

const blackListControllers = require('../controllers/blackListJwt')

router.post('/post', blackListControllers.post)
router.get('/get', blackListControllers.get)

module.exports = router