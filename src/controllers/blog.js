const blog = require("../models/blog");

const regexSpecialCharacters = /\W|_/g;

exports.postBlogsHomeOrBlogsPage = (req, res, next) => {
  const id = req.body.id;
  const image = !req.file ? null : req.file.path;
  const title = req.body.title;
  const deskripsi = req.body.deskripsi;
  const idCategory = req.body.idCategory;

  if (!req.file) {
    const post = new blog({
      id: id,
      title: title,
      deskripsi: deskripsi,
      data: [],
    });

    post
      .save()
      .then((result) => {
        res.status(201).json({
          message: "blogs home or blogs page berhasil di post",
          data: result,
        });
      })
      .catch((err) => console.log(err));
  } else if (req.file.path) {
    const post = new blog({
      id: id,
      idCategory: idCategory,
      image: image,
      title: title,
      deskripsi: deskripsi,
      data: [],
    });

    post
      .save()
      .then((result) => {
        res.status(201).json({
          message: "blogs home or blogs page berhasil di post",
          data: result,
        });
      })
      .catch((err) => console.log(err));
  }
};

exports.postPopularPosts = (req, res, next) => {
  const id = req.body.id;

  const post = new blog({
    id: id,
    data: [],
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "popular posts berhasil di post",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.postBlogsDataForAllDocument = (req, res, next) => {
  const _id = req.params._id;

  // clock
  // const hours = new Date().getHours().toString().length === 1 ? `0${new Date().getHours()}` : new Date().getHours()
  // const minute = new Date().getMinutes().toString().length === 1 ? `${new Date().getMinutes()}` : new Date().getMinutes()

  // date
  // const nameMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // const dateNumber = new Date().getDate().toString().length === 1 ? `0${new Date().getDate()}` : new Date().getDate()
  // const mount = new Date().getMonth()
  // const years = new Date().getFullYear()

  const id = req.body.id;
  const image = req.body.image;
  const title = req.body.title;
  const paragraphSatu = req.body.paragraphSatu;
  const paragraphBeforeHighlight = req.body.paragraphBeforeHighlight;
  const paragraphHighlight = req.body.paragraphHighlight;
  const paragraphDua = req.body.paragraphDua;
  const category = req.body.category;
  const date = req.body.date;
  const clock = req.body.clock;
  const path = `${category.split(" ").join("-").toLowerCase()}/${title
    .replace(regexSpecialCharacters, "-")
    .toLowerCase()}`;

  const data = [
    {
      id: id,
      image: image,
      title: title,
      paragraphSatu: paragraphSatu,
      paragraphBeforeHighlight: paragraphBeforeHighlight,
      paragraphHighlight: paragraphHighlight,
      imageDetailContent: {},
      paragraphDua: paragraphDua,
      category: category,
      date: date,
      clock: clock,
      path: path,
      comments: [],
    },
  ];

  blog
    .updateOne({ _id: _id }, { $push: { data: { $each: data, $position: 0 } } })
    .then((result) => {
      res.status(201).json({
        message: "data content berhasil di post",
        data: result,
        idBlog: id,
      });
    })
    .catch((err) => console.log(err));
};

exports.postImgDetailContent = (req, res, next) => {
  const _id = req.params._id;
  const id = req.params.id;

  const image = req.body.image;

  const data = {
    image: image,
  };

  const updateDocument = {
    $set: { "data.$.imageDetailContent": data },
  };

  blog
    .updateOne({ _id: _id, "data.id": id }, updateDocument)
    .then((result) => {
      res.status(201).json({
        message: "image detail content berhasil di post",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.postComments = (req, res, next) => {
  const _id = req.params._id;
  const id = req.params.id;

  const reqId = req.body.id;
  const idUserComment = req.body.idUserComment;
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  const image = req.body.image;
  const times = req.body.times;

  const data = [
    {
      id: reqId,
      idUserComment: idUserComment,
      name: name,
      email: email,
      subject: subject,
      message: message,
      image: image,
      times: times,
    },
  ];

  const updateDocument = {
    $push: { "data.$.comments": { $each: data, $position: 0 } },
  };

  blog
    .updateOne({ _id: _id, "data.id": id }, updateDocument)
    .then((result) => {
      res.status(201).json({
        message: "user berhasil post comments",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.putBlogsHomeOrBlogsPage = (req, res, next) => {
  const _id = req.params._id;

  const image = !req.file ? null : req.file.path;
  const title = req.body.title;
  const deskripsi = req.body.deskripsi;

  function update(condition) {
    blog
      .findById(_id)
      .then((post) => {
        if (!post) {
          const err = new Error("data tidak ada");
          err.errorStatus = 404;
          throw err;
        }

        if (condition) {
          post.image = image;
          post.title = title;
          post.deskripsi = deskripsi;

          return post.save();
        } else {
          post.title = title;
          post.deskripsi = deskripsi;

          return post.save();
        }
      })
      .then((result) => {
        res.status(201).json({
          message: "blog home or blog page berhasil di update",
          data: result,
        });
      })
      .catch((err) => next(err));
  }

  if (!req.file) {
    update(false);
  } else {
    update(true);
  }
};

exports.putBlogsDataForAllDocument = (req, res, next) => {
  const property = req.params.property;
  const _id = req.params._id;
  const id = req.params.id;

  const hours =
    new Date().getHours().toString().length === 1
      ? `0${new Date().getHours()}`
      : new Date().getHours();
  const minute =
    new Date().getMinutes().toString().length === 1
      ? `${new Date().getMinutes()}`
      : new Date().getMinutes();

  const image = !req.file ? null : req.file.path;
  const title = req.body.title;
  const paragraphSatu = req.body.paragraphSatu;
  const paragraphBeforeHighlight = req.body.paragraphBeforeHighlight;
  const paragraphHighlight = req.body.paragraphHighlight;
  const paragraphDua = req.body.paragraphDua;
  const category = req.body.category;
  const date = req.body.date;
  const clock = `${hours}:${minute}`;
  const path = req.body.path;

  const updateDocumentImage = {
    $set: { "data.$.image": image },
  };
  const updateDocumentTitle = {
    $set: { "data.$.title": title },
  };
  const updateDocumentParagraphSatu = {
    $set: { "data.$.paragraphSatu": paragraphSatu },
  };
  const updateDocumentParagraphBeforeHighlight = {
    $set: { "data.$.paragraphBeforeHighlight": paragraphBeforeHighlight },
  };
  const updateDocumentParagraphHightlight = {
    $set: { "data.$.paragraphHighlight": paragraphHighlight },
  };
  const updateDocumentParagraphDua = {
    $set: { "data.$.paragraphDua": paragraphDua },
  };
  const updateDocumentCategory = {
    $set: { "data.$.category": category },
  };
  const updateDocumentDate = {
    $set: { "data.$.date": date },
  };
  const updateDocumentClock = {
    $set: { "data.$.clock": clock },
  };
  const updateDocumentPath = {
    $set: { "data.$.path": path },
  };

  function updateDocument(document, propertyUpdate) {
    blog
      .updateOne({ _id: _id, "data.id": id }, document)
      .then((result) => {
        res.status(201).json({
          message: `${propertyUpdate} content blog berhasil di update`,
          data: result,
        });
      })
      .catch((err) => console.log(err));
  }

  if (property === "image") {
    updateDocument(updateDocumentImage, "image");
  } else if (property === "title") {
    updateDocument(updateDocumentTitle, "title");
  } else if (property === "paragraphSatu") {
    updateDocument(updateDocumentParagraphSatu, "paragraphSatu");
  } else if (property === "paragraphBeforeHighlight") {
    updateDocument(
      updateDocumentParagraphBeforeHighlight,
      "paragraphBeforeHighlight"
    );
  } else if (property === "paragraphHighlight") {
    updateDocument(updateDocumentParagraphHightlight, "paragraphHightlight");
  } else if (property === "paragraphDua") {
    updateDocument(updateDocumentParagraphDua, "paragraphDua");
  } else if (property === "category") {
    updateDocument(updateDocumentCategory, "category");
  } else if (property === "date") {
    updateDocument(updateDocumentDate, "date");
  } else if (property === "clock") {
    updateDocument(updateDocumentClock, "clock");
  } else if (property === "path") {
    updateDocument(updateDocumentPath, "path");
  } else {
    return res.status(404).json({
      errors: `/v9/blog/put/all-document/data/${property}/${_id}/${id}`,
      message: `tidak ada property yang bernama ${property} pada query`,
    });
  }
};

exports.putProfileUserComment = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const image = req.body.image;

  const updateDocument = {
    $set: {
      "data.$[comments].comments.$[id].name": name,
      "data.$[comments].comments.$[id].image": image,
    },
  };

  const options = {
    arrayFilters: [{ "comments.comments.id": id }, { "id.id": id }],
  };

  blog
    .updateMany({}, updateDocument, options)
    .then((result) => {
      res.status(201).json({
        message: "user profile on comments is updated",
        userFromId: id,
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAll = (req, res, next) => {
  let totalItems;
  const { limit = 10, page = 1 } = req.query;

  blog
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return blog
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

exports.deleteComment = (req, res, next) => {
  const _idblog = req.params._idBlog;
  const idUserComment = req.params.idUserComment;
  const index = req.params.index;

  blog
    .updateOne(
      { _id: _idblog },
      {
        $pull: { [`data.${index}.comments`]: { idUserComment: idUserComment } },
      }
    )
    .then((result) => {
      res.status(200).json({
        message: "user comment berhasil di delete",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};
