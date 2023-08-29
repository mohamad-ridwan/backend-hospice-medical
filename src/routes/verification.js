const router = require("express").Router();

const {
  deleteToken,
  get,
  getTokenJwt,
  jwtCreateNewPassword,
  post,
  put,
} = require("../controllers/verification");

router.post("/post", post);
router.get("/get", get);
router.put("/put/:userId", put);
// verif create-new-password
router.post(
  "/post/forgot-password/create-new-password/:userId/:role",
  jwtCreateNewPassword
);
router.get("/get/forgot-password/create-new-password", getTokenJwt);
router.delete("/delete/:userId", deleteToken);

module.exports = router;
