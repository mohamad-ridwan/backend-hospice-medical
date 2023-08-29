const router = require("express").Router();

const {
  get,
  post,
  putAdmin,
  putIsVerification,
} = require("../controllers/admin");

router.post("/post", post);
router.put("/put/:adminId", putIsVerification);
router.put("/put/admin/:id", putAdmin);
router.get("/get", get);

module.exports = router;
