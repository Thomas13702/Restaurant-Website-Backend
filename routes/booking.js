const express = require("express");
const { check, validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");
require("dotenv/config");

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
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("telephone", "Telephone is required").not().isEmpty(),
    check("numInParty", "Number of guests are required").not().isEmpty(),
    check("date", "Date is required").not().isEmpty(),
    check("time", "The time is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
      const savedBooking = await booking.save();
      res.json(savedBooking);

      //send email
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: req.body.email,
        from: process.env.EMAIL, // Use the email address or domain you verified above
        subject: "Your Booking at The Restaurant",
        text: `Name: ${req.body.name}, Time: ${req.body.time}, Date: ${req.body.date}, Number of Guests: ${req.body.numInParty}`,
        html: `<strong>Name: ${req.body.name}, Time: ${req.body.time}, Date: ${req.body.date}, Number of Guests: ${req.body.numInParty}</strong>`,
      };
      //ES6
      sgMail.send(msg).then(
        () => {},
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      );
      //ES8
      (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      })();
    } catch (err) {
      res.status.json({ message: err });
    }
  }
);

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
