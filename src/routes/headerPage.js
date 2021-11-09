const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/headerPage')

router.post('/post/header-all-page', useControllers.postHeaderAllPage)
router.put('/put/header-all-page/:_id', useControllers.putHeaderAllPage)
router.get('/get', useControllers.getAll)

module.exports = router