const express = require("express");
const {
  sendRequest,
  getRecievedRequests,
  acceptRequest,
  getSentRequests,
} = require("../controllers/requestController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/recieved", auth, getRecievedRequests);

router.get("/sent", auth, getSentRequests);

router.post("/send/:eventId", auth, sendRequest);

router.patch("/accept/:requestId", auth, acceptRequest);

module.exports = router;
