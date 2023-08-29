const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blackListJwt = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("black-list-jwt", blackListJwt);
