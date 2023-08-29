require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./src/dbConnection");
const errorHandler = require("./src/utils/errorHandler");
const { customHeader } = require("./src/utils/middleawres");
const { multerPath, multerStorage } = require("./src/utils/fileStorage");

const app = express();

const PORT = process.env.PORT || 4000;

dbConnection()
  .then(() => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // hande images
    app.use("/images", multerPath);
    app.use(multerStorage);

    app.use(customHeader);
    app.use("/", require("./src/routes"));
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
