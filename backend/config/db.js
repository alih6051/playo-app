const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.DATABASE_URI);

module.exports = connection;
