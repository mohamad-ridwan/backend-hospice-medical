const router = require("express").Router();

const { get, post } = require("../controllers/blackListJwt");

router.post("/post", post);
router.get("/get", get);

module.exports = router;
