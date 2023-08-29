const router = require("express").Router();

const {
  deleteCommen,
  deleteComment,
  getAll,
  postBlogsDataForAllDocument,
  postBlogsHomeOrBlogsPage,
  postComments,
  postImgDetailContent,
  postPopularPosts,
  putBlogsDataForAllDocument,
  putBlogsHomeOrBlogsPage,
  putProfileUserComment,
} = require("../controllers/blog");

router.post("/post/blogs-home-or-blogs-page", postBlogsHomeOrBlogsPage);
router.post("/post/popular-posts", postPopularPosts);
router.post("/post/all-document/data/:_id", postBlogsDataForAllDocument);
router.post(
  "/post/all-document/data/image-detail-content/:_id/:id",
  postImgDetailContent
);
router.post("/post/all-document/data/comments/:_id/:id", postComments);
router.put("/put/blogs-home-or-blogs-page/:_id", putBlogsHomeOrBlogsPage);
router.put(
  "/put/all-document/data/:property/:_id/:id",
  putBlogsDataForAllDocument
);
router.put(
  "/put/profile-user-comment/every-article/data/comments/:id",
  putProfileUserComment
);
router.get("/get", getAll);
router.delete(
  "/delete/blog/data/comments/:_idBlog/:idUserComment/:index",
  deleteComment
);

module.exports = router;
