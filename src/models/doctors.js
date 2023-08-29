const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const doctors = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
    },
    deskripsi: {
      type: String,
    },
    data: {
      type: Array,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    nameIcon: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("doctor", doctors);
