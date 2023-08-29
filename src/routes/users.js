const router = require("express").Router();

const {
  get,
  post,
  putIsVerification,
  putUser,
} = require("../controllers/users");

router.post("/post", post);
router.put("/put/:userId", putIsVerification);
router.put("/put/user/:id", putUser);
router.get("/get", get);

module.exports = router;
