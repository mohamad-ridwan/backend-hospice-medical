const router = require("express").Router();

const {
  deleteProfileDoctor,
  get,
  post,
  postData,
  postMedsos,
  put,
  putData,
  putMedsos,
  putProfileDoctor,
} = require("../controllers/doctors");

router.post("/post", post);
router.post("/post/data/:id", postData);
router.put("/put/role/:roleId/data/:id", putProfileDoctor);
router.post("/post/data/medsos/:_id/:id", postMedsos);
router.put("/put/:_id", put);
router.put("/put/data/:property/:_id/:id", putData);
router.put(
  "/put/profile-doctors/data/data-medsos/:property/:_id/:id/:idMedsos",
  putMedsos
);
router.get("/get", get);
// delete profile doctor
router.delete("/delete/role/:roleId/data/:id", deleteProfileDoctor);

module.exports = router;
