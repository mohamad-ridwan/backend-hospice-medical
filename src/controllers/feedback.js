const feedback = require("../models/feedback");

exports.post = (req, res, next) => {
  const title = req.body.title;
  const deskripsi = req.body.deskripsi;

  const post = new feedback({
    title: title,
    deskripsi: deskripsi,
    data: [],
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "feedback berhasil di post",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.postData = (req, res, next) => {
  const _id = req.params._id;

  const id = `${new Date().getTime()}`;
  const image = req.file.path;
  const name = req.body.name;
  const comment = req.body.comment;

  const data = {
    id: id,
    image: image,
    name: name,
    comment: comment,
  };

  feedback
    .updateOne({ _id: _id }, { $push: { data: data } }, { upsert: true })
    .then((result) => {
      res.status(201).json({
        message: "data feedback berhasil di post",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.put = (req, res, next) => {
  const _id = req.params._id;

  const title = req.body.title;
  const deskripsi = req.body.deskripsi;

  feedback
    .findById(_id)
    .then((post) => {
      if (!post) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }

      post.title = title;
      post.deskripsi = deskripsi;

      return post.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "feedback berhasil di update",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.putData = (req, res, next) => {
  const _id = req.params._id;
  const id = req.params.id;

  const image = req.file.path;
  const name = req.body.name;
  const comment = req.body.comment;

  const updateDocumentImage = {
    $set: { "data.$.image": image },
  };

  const updateDocumentName = {
    $set: { "data.$.name": name },
  };

  const updateDocumentComment = {
    $set: { "data.$.comment": comment },
  };

  feedback
    .updateOne({ _id: _id, "data.id": id }, updateDocumentImage)
    .then((result) => {
      feedback
        .updateOne({ _id: _id, "data.id": id }, updateDocumentName)
        .then((result) => {
          feedback
            .updateOne({ _id: _id, "data.id": id }, updateDocumentComment)
            .then((result) => {
              res.status(201).json({
                message: "feedback user berhasil di update",
                data: result,
              });
            });
          return result;
        });
      return result;
    })
    .catch((err) => console.log(err));
};

exports.getAll = (req, res, next) => {
  let totalItems;
  const { limit = 10, page = 1 } = req.query;

  feedback
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return feedback
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
