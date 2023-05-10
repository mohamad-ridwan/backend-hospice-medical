const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/loket')

router.post('/post', useControllers.post)
router.post('/post/loket-info', useControllers.postLoketInfo)
router.get('/get', useControllers.getAll)

module.exports = router