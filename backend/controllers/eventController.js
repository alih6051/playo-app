const Event = require("../models/Event");

// @desc Get all events
// @route GET /events
// @access Public
const getAllEvents = async (req, res) => {
  const { q, state } = req.query;
  try {
    const filters = [
      {
        $or: [{ title: { $regex: q, $options: "i" } }],
      },
    ];

    if (state) filters.push({ state: state });

    const events = await Event.find({ $and: filters });
    res.send(events);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error", error });
  }
};

// @desc Get single event
// @route GET /events/:id
// @access Public
const getSingleEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate("partcipants");
    res.send(event);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error", error });
  }
};

// @desc Create event
// @route POST /events/create
// @access Private
const createEvent = async (req, res) => {
  const {
    title,
    description,
    cover,
    limit,
    venue,
    state,
    startAt,
    endAt,
    date,
  } = req.body;
  try {
    // Confirm data
    if (
      !title ||
      !cover ||
      !limit ||
      !venue ||
      !state ||
      !startAt ||
      !endAt ||
      !date
    )
      return res.status(400).send({ msg: "All fields are required." });

    // Create new event
    const event = new Event({
      title,
      description,
      cover,
      limit,
      venue,
      state,
      startAt,
      endAt,
      date,
      organisedBy: req.body.userId,
    });

    await event.save();
    res.send({ msg: "Event created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error", error });
  }
};

module.exports = { getAllEvents, createEvent, getSingleEvent };
