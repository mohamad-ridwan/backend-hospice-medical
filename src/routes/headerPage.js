const router = require("express").Router();

const {
  getAll,
  postHeaderAllPage,
  putHeaderAllPage,
} = require("../controllers/headerPage");

router.post("/post/header-all-page", postHeaderAllPage);
router.put("/put/header-all-page/:_id", putHeaderAllPage);
router.get("/get", getAll);

module.exports = router;
