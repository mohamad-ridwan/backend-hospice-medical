const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const finishedTreatment = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    rulesTreatment: {
      type: String,
    },
    patientId: {
      type: String,
    },
    patientName: {
      type: String,
    },
    patientEmail: {
      type: String,
    },
    phone: {
      type: String,
    },
    confirmedTime: {
      type: Object,
    },
    dateConfirm: {
      type: String,
    },
    confirmHour: {
      type: String,
    },
    adminInfo: {
      type: Object,
    },
    emailAdmin: {
      type: String,
    },
    nameAdmin: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("finished-treatment", finishedTreatment);
