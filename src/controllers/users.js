const users = require("../models/users");

exports.post = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const image = req.body.image;
  const password = req.body.password;
  const isVerification = false;

  const post = new users({
    id: id,
    name: name,
    email: email,
    image: image,
    password: password,
    isVerification: isVerification,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "user berhasil post data",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.putIsVerification = (req, res, next) => {
  const userId = req.params.userId;

  const isVerification = req.body.isVerification;

  users
    .findOne({ id: userId })
    .then((post) => {
      if (!post) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }

      post.isVerification = isVerification;

      return post.save();
    })
    .then((result) => {
      res.status(201).json({
        message: `user ${userId} berhasil di verifikasi`,
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.putUser = (req, res, next) => {
  const id = req.params.id;

  const name = req.body.name;
  const image = req.body.image;
  const password = req.body.password;

  users
    .findOne({ id: id })
    .then((post) => {
      if (!post) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }

      post.name = name;
      post.image = image;
      post.password = password;

      return post.save();
    })
    .then((result) => {
      res.status(201).json({
        message: `user register ${id} berhasil di update`,
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.get = (req, res, next) => {
  let totalItems;
  const { limit = 10, page = 1 } = req.query;

  users
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return users
        .find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    })
    .then((result) => {
      res.status(200).json({
        message: "semua di dapatkan",
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
