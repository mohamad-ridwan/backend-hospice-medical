const router = require("express").Router();

const {
  getAll,
  postContact,
  postLinkMedsos,
  postLogoWeb,
  postMenuCollapse,
  postMenuPage,
  putLinkMedsos,
  putLogoWeb,
  putMenuCollapse,
  putMenuPage,
} = require("../controllers/navbar");

router.post("/post/link-medsos", postLinkMedsos);
router.post("/post/contact", postContact);
router.post("/post/logo-web", postLogoWeb);
router.post("/post/menu-page", postMenuPage);
router.post("/post/menu-page/menu-collapse/:_id", postMenuCollapse);
router.put("/put/link-medsos/:_id", putLinkMedsos);
router.put("/put/logo-web/:_id", putLogoWeb);
router.put("/put/menu-page/:_id", putMenuPage);
router.put("/put/menu-page/menu-collapse/:_id/:id", putMenuCollapse);
router.get("/get", getAll);

module.exports = router;
