const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.DbUrl.url)
  .then(() => {
    console.log("mongodb atlas is connected");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
