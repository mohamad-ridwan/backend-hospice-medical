const router = require("express").Router();

const {
  getAll,
  postContactUs,
  postNewsletter,
  postUsersEmail,
  putContactUs,
  putNewsletter,
} = require("../controllers/footer");

router.post("/post/contact-us", postContactUs);
router.post("/post/newsletter", postNewsletter);
router.post("/post/newsletter/users/:_id", postUsersEmail);
router.put("/put/contact-us/:_id", putContactUs);
router.put("/put/newsletter/:_id", putNewsletter);
router.get("/get", getAll);

module.exports = router;
