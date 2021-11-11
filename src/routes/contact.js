const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/contact')

router.post('/post/google-maps', useControllers.postGoogleMaps)
router.post('/post/contact', useControllers.postContactAddress)
router.post('/post/contact-address/data/:_id', useControllers.postDataContactAddress)
router.post('/post/form-contact-us/data/:_id', useControllers.postFormContactUs)
router.put('/put/google-maps/:idParams', useControllers.putGoogleMaps)
router.put('/put/contact-address/data/:property/:_id/:id', useControllers.putDataContactAddress)
router.get('/get/get-all', useControllers.getAll)

module.exports = router