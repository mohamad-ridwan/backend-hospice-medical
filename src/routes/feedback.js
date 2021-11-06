const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/feedback')

router.post('/post', useControllers.post)
router.post('/post/data/:_id', useControllers.postData)
router.put('/put/:_id', useControllers.put)
router.put('/put/data/:_id/:id', useControllers.putData)

module.exports = router