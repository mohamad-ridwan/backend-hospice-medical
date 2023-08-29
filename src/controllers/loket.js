const loket = require("../models/loket");

exports.post = (req, res, next) => {
  const id = req.body.id;
  // patient-queue
  const loketRules = req.body.loketRules;
  const loketName = req.body.loketName;
  const patientId = req.body.patientId;
  const patientName = req.body.patientName;
  const emailAddress = req.body.emailAddress;
  const phone = req.body.phone;
  const queueNumber = req.body.queueNumber;
  const message = req.body.message;
  const emailAdmin = req.body.emailAdmin;
  const isNotif = false;
  const presence = req.body.presence;
  const submissionDate = req.body.submissionDate;
  const submitHours = req.body.submitHours;
  const isConfirm = req.body.isConfirm;

  const post = new loket({
    id,
    loketRules,
    loketName,
    patientId,
    patientName,
    emailAddress,
    phone,
    queueNumber,
    message,
    emailAdmin,
    isNotif,
    presence,
    submissionDate,
    submitHours,
    isConfirm,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "berhasil post data patient ke loket",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.postLoketInfo = (req, res, next) => {
  const id = req.body.id;
  // info-loket
  const loketRules = req.body.loketRules;
  const loketInfo = [];

  const post = new loket({
    id,
    loketRules,
    loketInfo,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "berhasil post loket info",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.putBioPatient = (req, res, next) => {
  const _id = req.params._id;

  const patientName = req.body.patientName;
  const phone = req.body.phone;
  const emailAdmin = req.body.emailAdmin;

  loket
    .findById(_id)
    .then((post) => {
      if (!post) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }

      post.patientName = patientName;
      post.phone = phone;
      post.emailAdmin = emailAdmin;

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

exports.putPatientQueue = (req, res, next) => {
  const _id = req.params._id;

  const id = req.body.id;
  const dateConfirm = req.body.dateConfirm;
  const confirmHour = req.body.confirmHour;
  const emailAdmin = req.body.emailAdmin;
  const nameAdmin = req.body.nameAdmin;
  const confirmState = req.body.confirmState;
  const paymentMethod = req.body.paymentInfo.paymentMethod;
  const bpjsNumber = req.body.paymentInfo.bpjsNumber;
  const totalCost = req.body.paymentInfo.totalCost;

  const data = {
    id,
    dateConfirm,
    confirmHour,
    emailAdmin,
    nameAdmin,
    confirmState,
    paymentInfo: {
      paymentMethod,
      bpjsNumber,
      totalCost,
    },
  };

  const updateDocument = {
    $set: { isConfirm: data },
  };

  loket
    .updateOne({ _id: _id }, updateDocument)
    .then((result) => {
      res.status(201).json({
        message: "patient in the counter is confirmed",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.putPresence = (req, res, next) => {
  const _id = req.params._id;

  const presence = req.body.presence;

  loket
    .findById(_id)
    .then((post) => {
      if (!post) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }

      post.presence = presence;

      return post.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "presence is updated",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  let totalItems;
  const { limit = 10, page = 1 } = req.query;

  loket
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return loket
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

exports.deleteLokets = (req, res, next) => {
  const _id = req.params._id;

  loket
    .deleteOne({ _id: _id })
    .then((result) => {
      res.status(200).json({
        message: "success delete in the loket",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};
