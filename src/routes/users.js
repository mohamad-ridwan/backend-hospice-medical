const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/users')

router.post('/post', useControllers.post)
router.get('/get', useControllers.get)

module.exports = router