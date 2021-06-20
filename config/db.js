const mongoose = require("mongoose");
require("dotenv/config");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CONNECTION,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
      () => console.log("\x1b[34m%s\x1b[0m", "Connected to Database...")
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
