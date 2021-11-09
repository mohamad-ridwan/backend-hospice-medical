const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/procedureCategory')

router.post('/post', useControllers.postProcedureCategory)
router.post('/post/data-img/:_id', useControllers.postDataImg)
router.put('/put/:_id', useControllers.putProcedureCategory)
router.put('/put/data-img/:_id/:id', useControllers.putDataImg)
router.get('/get', useControllers.getAll)

module.exports = router