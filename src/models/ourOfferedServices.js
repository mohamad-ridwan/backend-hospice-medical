const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ourOfferedServices = new Schema(
  {
    title: {
      type: String,
    },
    deskripsi: {
      type: String,
    },
    data: {
      type: Array,
    },
    id: {
      type: String,
      unique: true,
    },
    nameIcon: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("our-offered-services", ourOfferedServices);
