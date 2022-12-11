const mongoose = require("mongoose");
const config = require("./config.js");

const URL = config.dbUrl.url;

mongoose
  .connect(URL)
  .then(() => {
    console.log(`mongodb is connected`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
