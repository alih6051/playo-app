const express = require("express");
const {
  getAllEvents,
  createEvent,
  getSingleEvent,
} = require("../controllers/eventController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", getAllEvents);

router.get("/:id", getSingleEvent);

router.post("/create", auth, createEvent);

module.exports = router;
