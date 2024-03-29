"use strict";
const router = require("express").Router();

const aboutMyself = require("./aboutMyself");
const admin = require("./admin");
const blackListJwt = require("./blackListJwt");
const blog = require("./blog");
const contact = require("./contact");
const doctors = require("./doctors");
const feedback = require("./feedback");
const finishedTreatment = require("./finishedTreatment");
const footer = require("./footer");
const headerPage = require("./headerPage");
const loket = require("./loket");
const navbar = require("./navbar");
const ourOfferedServices = require("./ourOfferedServices");
const procedureCategory = require("./procedureCategory");
const servicingHours = require("./servicingHours");
const users = require("./users");
const verification = require("./verification");

router.use("/about-myself", aboutMyself);
router.use("/admin", admin);
router.use("/black-list-jwt", blackListJwt);
router.use("/blog", blog);
router.use("/contact", contact);
router.use("/doctors", doctors);
router.use("/feedback", feedback);
router.use("/finished-treatment", finishedTreatment);
router.use("/footer", footer);
router.use("/header-page", headerPage);
router.use("/loket", loket);
router.use("/navbar", navbar);
router.use("/our-offered-services", ourOfferedServices);
router.use("/procedure-category", procedureCategory);
router.use("/servicing-hours", servicingHours);
router.use("/users", users);
router.use("/verification", verification);

module.exports = router;
