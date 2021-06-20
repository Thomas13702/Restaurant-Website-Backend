const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//Connect to DB
connectDB();

//Middleware
app.use(cors());
app.use(express.json());

//Import routes
const bookingRoute = require("./routes/booking");

//Define routes
app.use("/booking", bookingRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log("\x1b[32m%s\x1b[0m", `Server Started on port ${PORT}`)
);
