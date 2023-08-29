const router = require("express").Router();

const {
  getAll,
  post,
  postDataBio,
  put,
  putDataBio,
} = require("../controllers/aboutMyself");

router.post("/post", post);
router.post("/post/data-bio/:_id", postDataBio);
router.put("/put/:_id", put);
router.put("/put/data-bio/:_id/:id", putDataBio);
router.get("/get", getAll);

module.exports = router;
