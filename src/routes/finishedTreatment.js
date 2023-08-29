const router = require("express").Router();

const {
  deleteItems,
  getAll,
  postPatientFinishTreatment,
  putBioPatient,
} = require("../controllers/finishedTreatment");

router.post("/post/patient-registration", postPatientFinishTreatment);
router.put("/put/rules-treatment/patient-registration/:_id", putBioPatient);
router.get("/get", getAll);
router.delete("/delete/items/:_id", deleteItems);

module.exports = router;
