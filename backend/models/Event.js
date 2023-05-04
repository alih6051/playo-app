const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    cover: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    startAt: {
      type: String,
      required: true,
    },
    endAt: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
        default: [],
      },
    ],
    partcipants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
        default: [],
      },
    ],
    organisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Event = mongoose.model("event", eventSchema);

module.exports = Event;
