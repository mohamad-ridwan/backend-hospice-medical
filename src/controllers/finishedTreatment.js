const finishedTreatment = require("../models/finishedTreatment");

exports.postPatientFinishTreatment = (req, res, next) => {
  const id = req.body.id;
  // rulesTreatment = 'patient-registration'
  const rulesTreatment = req.body.rulesTreatment;
  const patientId = req.body.patientId;
  const patientName = req.body.patientName;
  const patientEmail = req.body.patientEmail;
  const phone = req.body.phone;
  const confirmHour = req.body.confirmedTime.confirmHour;
  const dateConfirm = req.body.confirmedTime.dateConfirm;
  const emailAdmin = req.body.adminInfo.emailAdmin;
  const nameAdmin = req.body.adminInfo.nameAdmin;

  const post = new finishedTreatment({
    id,
    rulesTreatment,
    patientId,
    patientName,
    patientEmail,
    phone,
    confirmedTime: {
      confirmHour,
      dateConfirm,
    },
    adminInfo: {
      emailAdmin,
      nameAdmin,
    },
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "successful post finished treatment of patient",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.putBioPatient = (req, res, next) => {
  const _id = req.params._id;

  const patientName = req.body.patientName;
  const patientEmail = req.body.patientEmail;
  const phone = req.body.phone;

  finishedTreatment
    .findById(_id)
    .then((post) => {
      if (!post) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }

      post.patientName = patientName;
      post.patientEmail = patientEmail;
      post.phone = phone;

      return post.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "bio patient is updated",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  let totalItems;
  const { limit = 10, page = 1 } = req.query;

  finishedTreatment
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return finishedTreatment
        .find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    })
    .then((result) => {
      res.status(200).json({
        message: "semua data di dapatkan",
        data: result,
        pagination: {
          totalData: totalItems,
          currentPage: +page,
          limit: +limit,
        },
      });
    })
    .catch((err) => next(err));
};

exports.deleteItems = (req, res, next) => {
  const _id = req.params._id;

  finishedTreatment
    .deleteOne({ _id: _id })
    .then((result) => {
      res.status(200).json({
        message: "success delete in the finished treatment",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};
