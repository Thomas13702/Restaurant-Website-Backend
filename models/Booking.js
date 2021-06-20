const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
  },
  numInParty: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
});

module.exports = mongoose.model("Bookings", BookingSchema);
