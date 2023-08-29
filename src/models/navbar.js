const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const navbar = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    path: {
      type: String,
    },
    nameIcon: {
      type: String,
    },
    contact: {
      type: String,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    menuCollapse: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("navbar", navbar);
