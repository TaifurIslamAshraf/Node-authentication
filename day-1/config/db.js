const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.dbUrl.url)
  .then(() => {
    console.log(`mongodb atlas is connected`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
