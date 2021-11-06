const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/aboutMyself')

router.post('/post', useControllers.post)
router.post('/post/data-bio/:_id', useControllers.postDataBio)
router.put('/put/:_id', useControllers.put)
router.put('/put/data-bio/:_id/:id', useControllers.putDataBio)

module.exports = router