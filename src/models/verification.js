const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const verification = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    userId: {
      type: String,
    },
    verification: {
      token: {
        type: String,
      },
      date: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("verification", verification);
