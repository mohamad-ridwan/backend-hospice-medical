const contact = require("../models/contact");

exports.postGoogleMaps = (req, res, next) => {
  const id = req.body.id;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const apiKey = req.body.apiKey;

  const post = new contact({
    id: id,
    lat: lat,
    lng: lng,
    apiKey: apiKey,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "berhasil post data google maps",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.postContactAddress = (req, res, next) => {
  const id = req.body.id;

  const post = new contact({
    id: id,
    data: [],
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "contact address berhasil di post",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.postDataContactAddress = (req, res, next) => {
  const _id = req.params._id;

  const id = `${new Date().getTime()}`;
  const title = req.body.title;
  const deskripsi = req.body.deskripsi;
  const nameIcon = req.body.nameIcon;

  const data = {
    id: id,
    title: title,
    deskripsi: deskripsi,
    nameIcon: nameIcon,
  };

  contact
    .updateOne({ _id: _id }, { $push: { data: data } }, { upsert: true })
    .then((result) => {
      res.status(201).json({
        message: "data contact-address berhasil di post",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.postFormContactUs = (req, res, next) => {
  const _id = req.params._id;

  const id = `${new Date().getTime()}`;
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  const data = {
    id: id,
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  contact
    .updateOne({ _id: _id }, { $push: { data: data } }, { upsert: true })
    .then((result) => {
      res.status(201).json({
        message: "data form-contact-us berhasil di post",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.putGoogleMaps = (req, res, next) => {
  const _id = req.params._id;

  const lat = req.body.lat;
  const lng = req.body.lng;
  const apiKey = req.body.apiKey;

  contact
    .findById(_id)
    .then((post) => {
      if (!post) {
        const err = new Error("data tidak ada");
        err.errorStatus = 404;
        throw err;
      }

      post.lat = lat;
      post.lng = lng;
      post.apiKey = apiKey;

      return post.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "data google maps berhasil di update",
        data: result,
      });
    })
    .catch((err) => next(err));
};

exports.putDataContactAddress = (req, res, next) => {
  const property = req.params.property;
  const _id = req.params._id;
  const id = req.params.id;

  const title = req.body.title;
  const deskripsi = req.body.deskripsi;
  const nameIcon = req.body.nameIcon;

  const updateDocumentTitle = {
    $set: { "data.$.title": title },
  };
  const updateDocumentDeskripsi = {
    $set: { "data.$.deskripsi": deskripsi },
  };
  const updateDocumentNameIcon = {
    $set: { "data.$.nameIcon": nameIcon },
  };

  function update(document) {
    contact
      .updateOne({ _id: _id, "data.id": id }, document)
      .then((result) => {
        res.status(201).json({
          message: `property ${property} pada contact-address berhasil di update`,
          data: result,
        });
      })
      .catch((err) => console.log(err));
  }

  if (property === "title") {
    update(updateDocumentTitle);
  } else if (property === "deskripsi") {
    update(updateDocumentDeskripsi);
  } else if (property === "nameIcon") {
    update(updateDocumentNameIcon);
  } else {
    return res.status(404).json({
      error: `/v11/contact/put/contact-address/data/${property}/${_id}/${id}`,
      message: `tidak ada property yang bernama ${property}`,
    });
  }
};

exports.getAll = (req, res, next) => {
  let totalItems;
  const { limit = 10, page = 1 } = req.query;

  contact
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return contact
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
