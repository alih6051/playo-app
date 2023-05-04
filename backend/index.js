require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const rootRoutes = require("./routes/rootRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const requestRoutes = require("./routes/requestRoutes");
const connection = require("./config/db");
const PORT = process.env.PORT || 4500;

app.use(express.static("public"));

app.use(express.json());

app.use(cookieParser());

app.use(cors(corsOptions));

app.use("/", rootRoutes);

app.use("/users", userRoutes);

app.use("/events", eventRoutes);

app.use("/requests", requestRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error in Database connection");
  }
  console.log(`Server running on port ${PORT}`);
});
