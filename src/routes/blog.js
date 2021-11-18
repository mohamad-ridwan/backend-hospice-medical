const express = require('express')

const router = express.Router()

const useControllers = require('../controllers/blog')

router.post('/post/blogs-home-or-blogs-page', useControllers.postBlogsHomeOrBlogsPage)
router.post('/post/popular-posts', useControllers.postPopularPosts)
router.post('/post/all-document/data/:_id', useControllers.postBlogsDataForAllDocument)
router.post('/post/all-document/data/image-detail-content/:_id/:id', useControllers.postImgDetailContent)
router.post('/post/all-document/data/comments/:_id/:id', useControllers.postComments)
router.put('/put/blogs-home-or-blogs-page/:_id', useControllers.putBlogsHomeOrBlogsPage)
router.put('/put/all-document/data/:property/:_id/:id', useControllers.putBlogsDataForAllDocument)
router.get('/get', useControllers.getAll)

module.exports = router