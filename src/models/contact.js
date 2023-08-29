const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contact = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
    apiKey: {
      type: String,
    },
    data: {
      type: Array,
    },
    title: {
      type: String,
    },
    deskripsi: {
      type: String,
    },
    nameIcon: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contact);
