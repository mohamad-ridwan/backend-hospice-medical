const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const procedureCategory = new Schema(
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
    dataImg: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("procedure-category", procedureCategory);
