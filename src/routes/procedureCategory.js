const router = require("express").Router();

const {
  getAll,
  postDataImg,
  postProcedureCategory,
  putDataImg,
  putProcedureCategory,
} = require("../controllers/procedureCategory");

router.post("/post", postProcedureCategory);
router.post("/post/data-img/:_id", postDataImg);
router.put("/put/:_id", putProcedureCategory);
router.put("/put/data-img/:_id/:id", putDataImg);
router.get("/get", getAll);

module.exports = router;
