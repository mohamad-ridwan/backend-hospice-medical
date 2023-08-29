const multer = require("multer");
const express = require("express");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}` + "-" + file.originalname);
  },
});

const multerStorage = multer({ storage: fileStorage }).single("image");
const multerPath = express.static(path.join(__dirname, "images"));

module.exports = { multerPath, multerStorage };
