const headerPage = require("../models/headerPage");

exports.postHeaderAllPage = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const deskripsi = req.body.deskripsi;
  const image = req.file.path;

  const post = new headerPage({
    id: id,
    title: title,
    deskripsi: deskripsi,
    image: image,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "header page berhasil di post",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.putHeaderAllPage = (req, res, next) => {
  const _id = req.params._id;

  const title = req.body.title;
  const deskripsi = req.body.deskripsi;
  const image = req.file.path;

  headerPage
    .findById(_id)
    .then((post) => {
      if (!post) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }

      post.title = title;
      post.deskripsi = deskripsi;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "header page berhasil di update",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  let totalItems;
  const { limit = 10, page = 1 } = req.query;

  headerPage
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return headerPage
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
