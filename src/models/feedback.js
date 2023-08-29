const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedback = new Schema(
  {
    title: {
      type: String,
      unique: true,
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
    comment: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedback", feedback);
