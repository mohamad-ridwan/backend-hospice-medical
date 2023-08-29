const router = require("express").Router();

const {
  getAll,
  postContactAddress,
  postDataContactAddress,
  postFormContactUs,
  postGoogleMaps,
  putDataContactAddress,
  putGoogleMaps,
} = require("../controllers/contact");

router.post("/post/google-maps", postGoogleMaps);
router.post("/post/contact", postContactAddress);
router.post("/post/contact-address/data/:_id", postDataContactAddress);
router.post("/post/form-contact-us/data/:_id", postFormContactUs);
router.put("/put/google-maps/:idParams", putGoogleMaps);
router.put(
  "/put/contact-address/data/:property/:_id/:id",
  putDataContactAddress
);
router.get("/get/get-all", getAll);

module.exports = router;
