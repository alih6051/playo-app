const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "event",
    },
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      default: "pending",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("request", requestSchema);

module.exports = User;
