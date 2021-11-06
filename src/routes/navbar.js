const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/navbar')

router.post('/post/link-medsos', useControllers.postLinkMedsos)
router.post('/post/contact', useControllers.postContact)
router.post('/post/logo-web', useControllers.postLogoWeb)
router.post('/post/menu-page', useControllers.postMenuPage)
router.post('/post/menu-page/menu-collapse/:_id', useControllers.postMenuCollapse)
router.put('/put/link-medsos/:_id', useControllers.putLinkMedsos)
router.put('/put/logo-web/:_id', useControllers.putLogoWeb)
router.put('/put/menu-page/:_id', useControllers.putMenuPage)
router.put('/put/menu-page/menu-collapse/:_id/:id', useControllers.putMenuCollapse)

module.exports = router