const footer = require("../models/footer");

exports.postContactUs = (req, res, next) => {
  const id = req.body.id;
  const alamat = req.body.alamat;
  const noTelpSatu = req.body.noTelpSatu;
  const noTelpDua = req.body.noTelpDua;
  const copyRight = req.body.copyRight;

  const post = new footer({
    id: id,
    alamat: alamat,
    noTelpSatu: noTelpSatu,
    noTelpDua: noTelpDua,
    copyRight: copyRight,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "contact us berhasil di post",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.postNewsletter = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;

  const post = new footer({
    id: id,
    title: title,
    data: [],
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "user berhasil mengirim email untuk newsletter",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.postUsersEmail = (req, res, next) => {
  const _id = req.params._id;

  const email = req.body.email;

  const data = {
    email: email,
  };

  footer
    .updateOne({ _id: _id }, { $push: { data: data } }, { upsert: true })
    .then((result) => {
      res.status(201).json({
        message: "user berhasil mengirim email untuk newsletter",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.putContactUs = (req, res, next) => {
  const _id = req.params._id;

  const alamat = req.body.alamat;
  const noTelpSatu = req.body.noTelpSatu;
  const noTelpDua = req.body.noTelpDua;
  const copyRight = req.body.copyRight;

  footer
    .findById(_id)
    .then((post) => {
      if (!post) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }

      post.alamat = alamat;
      post.noTelpSatu = noTelpSatu;
      post.noTelpDua = noTelpDua;
      post.copyRight = copyRight;

      return post.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "contact us berhasil di update",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.putNewsletter = (req, res, next) => {
  const _id = req.params._id;

  const title = req.body.title;

  footer
    .findById(_id)
    .then((post) => {
      if (!post) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }

      post.title = title;

      return post.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "title newsletter berhasil di update",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.getAll = (req, res, next) => {
  let totalItems;
  const { limit = 10, page = 1 } = req.query;

  footer
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return footer
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
