const Request = require("../models/Request");
const Event = require("../models/Event");

// @desc Get all requests
// @route GET /requests/recieved
// @access Private
const getRecievedRequests = async (req, res) => {
  try {
    const recievedRequests = await Request.find({
      receiver: req.body.userId,
    })
      .populate("sender")
      .populate("event")
      .sort({ createdAt: -1 });

    res.send(recievedRequests);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error", error });
  }
};

// @desc Get all sent requests
// @route GET /requests/sent
// @access Private
const getSentRequests = async (req, res) => {
  try {
    const sentRequests = await Request.find({
      sender: req.body.userId,
    })
      .populate("event")
      .sort({ createdAt: -1 });

    res.send(sentRequests);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error", error });
  }
};

// @desc Send join request
// @route POST /requests/send
// @access Private
const sendRequest = async (req, res) => {
  const { eventId } = req.params;
  try {
    const isRequested = await Request.findOne({
      sender: req.body.userId,
      event: eventId,
    });

    if (isRequested) {
      return res.status(409).json({ msg: "Already requested." });
    }

    // Get Event
    const event = await Event.findById(eventId);
    event.requests.push(req.body.userId);
    await event.save();

    // Create request
    const request = new Request({
      sender: req.body.userId,
      receiver: event.organisedBy,
      event: eventId,
    });
    await request.save();

    res.send({ requests: event.requests });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error", error });
  }
};

// @desc Accept join request
// @route PATCH /requests/send
// @access Private
const acceptRequest = async (req, res) => {
  const { requestId } = req.params;
  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(409).json({ msg: "Invaild request id." });
    }

    if (request.receiver != req.body.userId) {
      return res.status(409).json({ msg: "Authorization failed." });
    }

    request.status = "accepted";

    const event = await Event.findById(request.event);

    const removeIndex = event.requests
      .map((user) => user.toString())
      .indexOf(request.sender.toString());

    if (removeIndex < 0) {
      return res.status(409).json({ msg: "Request not found" });
    }

    event.requests.splice(removeIndex, 1);
    event.partcipants.push(request.sender);

    // Saving request and event
    await request.save();
    await event.save();

    res.send({ msg: "Request accepted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error", error });
  }
};

module.exports = {
  sendRequest,
  getRecievedRequests,
  getSentRequests,
  acceptRequest,
};
