const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const footer = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    alamat: {
      type: String,
    },
    noTelpSatu: {
      type: String,
    },
    noTelpDua: {
      type: String,
    },
    copyRight: {
      type: String,
    },
    data: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("footer", footer);
