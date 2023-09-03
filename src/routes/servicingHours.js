const router = require("express").Router();

const {
  cancelRegistration,
  deleteDataPatientOfPatientTreatment,
  deletePatientRegistration,
  getAll,
  postBookAnAppointment,
  postConfirmAppointmentDate,
  postDiseaseType,
  postPatientRegistration,
  postPatientTreatment,
  postServicing,
  postServicingData,
  postUserAppointmentData,
  putAdminInfo,
  putDiseaseType,
  putIsConfirm,
  putIsNotif,
  putPatientRegistration,
  putPresence,
  putServicing,
  putServicingData,
  updatePatientRegistration,
  getConfirmPatient,
  getPatientRegistration,
  getCounterInformation,
  getTableCounterInfo
} = require("../controllers/servicingHours");

router.post("/post/servicing", postServicing);
router.post("/post/servicing/data/:_id", postServicingData);
router.post("/post/book-an-appointment", postBookAnAppointment);
router.post("/post/book-an-appointment/disease-type/:_id", postDiseaseType);
router.post(
  "/post/book-an-appointment/user-appointment-data/:_id",
  postUserAppointmentData
);
router.post(
  "/post/book-an-appointment/user-appointment-data/is-confirm/:_id/:id",
  postConfirmAppointmentDate
);
router.put("/put/servicing/:_id", putServicing);
router.put("/put/servicing/data/:_id/:id", putServicingData);
router.put("/put/book-an-appointment/disease-type/:_id/:jenis", putDiseaseType);
router.put(
  "/put/book-an-appointment/user-appointment-data/:_id/:id/is-notif",
  putIsNotif
);
router.put(
  "/put/patient-registration-data/book-an-appointment/user-appointment-data/:_id/:id",
  putPatientRegistration
);
router.put(
  "/put/patient-registration-data/book-an-appointment/user-appointment-data/is-confirm/:_id/:id",
  putIsConfirm
);
router.put(
  "/put/patient-registration-data/book-an-appointment/user-appointment-data/is-confirm/presence/:_id/:id",
  putPresence
);
router.put(
  "/put/patient-registration-data/book-an-appointment/user-appointment-data/is-confirm/admin-info/profile-admin/updated/:_id/:email",
  putAdminInfo
);
router.get("/get", getAll);
router.get('/get/data-table/patient-registration', getPatientRegistration)
router.get('/get/data-table/confirmation-patients', getConfirmPatient)
router.get('/get/data-table/drug-counter/:counterName/:status', getTableCounterInfo)
router.get('/get/counter-information', getCounterInformation)
router.delete(
  "/delete/patient-registration-data/book-an-appointment/user-appointment-data/:_id/:id",
  deletePatientRegistration
);
router.delete(
  "/delete/patient-registration/book-an-appointment/:_id/user-appointment/cancel-registration/patient/:id",
  cancelRegistration
);
// post patient treatment
router.post("/post/role/:roleId", postPatientTreatment);
router.post("/post/role/:roleId/data", postPatientRegistration);
// update patient treatment
router.put("/put/role/:roleId/data/:id", updatePatientRegistration);
// delete patient treatment
router.delete(
  "/delete/role/:roleId/data/:id/:patientId",
  deleteDataPatientOfPatientTreatment
);

module.exports = router;
