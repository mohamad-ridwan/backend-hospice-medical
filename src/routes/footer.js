const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/footer')

router.post('/post/contact-us', useControllers.postContactUs)
router.post('/post/newsletter', useControllers.postNewsletter)
router.post('/post/newsletter/users/:_id', useControllers.postUsersEmail)
router.put('/put/contact-us/:_id', useControllers.putContactUs)

module.exports = router