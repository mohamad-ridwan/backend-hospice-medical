const router = require("express").Router();

const {
  deleteLokets,
  getAll,
  post,
  postLoketInfo,
  putBioPatient,
  putPatientQueue,
  putPresence,
} = require("../controllers/loket");

router.post("/post", post);
router.post("/post/loket-info", postLoketInfo);
router.put("/put/loket-rules/patient-queue/bio-patient/:_id", putBioPatient);
router.put("/put/loket-rules/patient-queue/:_id", putPatientQueue);
router.put("/put/loket-rules/patient-queue/presence/:_id", putPresence);
router.get("/get", getAll);
router.delete("/delete/lokets/:_id", deleteLokets);

module.exports = router;
