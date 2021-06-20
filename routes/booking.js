const express = require("express");

const router = express.Router();

const Booking = require("../models/Booking");

//Get all Bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a Specific Booking
router.get("/:bookingId", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    res.json(booking);
  } catch (err) {
    res.json({ message: err });
  }
});

//submits a booking
router.post("/", async (req, res) => {
  const booking = new Booking({
    name: req.body.name,
    email: req.body.email,
    telephone: req.body.telephone,
    numInParty: req.body.numInParty,
    date: req.body.date,
    time: req.body.time,
    comments: req.body.comments,
  });

  try {
    const savedBooking = await Booking.save();
    res.json(savedBooking);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a booking
router.patch("/:bookingId", async (req, res) => {
  try {
    const updatedBooking = await Booking.updateOne(
      {
        _id: req.params.bookingId,
      },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          telephone: req.body.telephone,
          numInParty: req.body.numInParty,
          date: req.body.date,
          time: req.body.time,
          comments: req.body.comments,
        },
      }
    );
    res.json(updatedBooking);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete a Booking
router.delete("/:bookingId", async (req, res) => {
  try {
    const removedBooking = await Booking.remove({ _id: req.params.bookingId });
    res.json(removedBooking);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
