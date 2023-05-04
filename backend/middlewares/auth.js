const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) res.status(401).send({ message: "Authorization failed " });
      req.body.userId = decoded.userId;
      next();
    });
  } else {
    res.status(400).send({ message: "Please login first" });
  }
};

module.exports = auth;
