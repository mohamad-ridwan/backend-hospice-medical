const router = require("express").Router();

const {
  getAll,
  post,
  postData,
  put,
  putData,
} = require("../controllers/feedback");

router.post("/post", post);
router.post("/post/data/:_id", postData);
router.put("/put/:_id", put);
router.put("/put/data/:_id/:id", putData);
router.get("/get", getAll);

module.exports = router;
