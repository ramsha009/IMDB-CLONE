const jwt = require("jsonwebtoken");

const isAdminAuthorized = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("No token found");
  }

  try {
    const decoded = jwt.verify(token, "ramsha");
    console.log(decoded);

    if (decoded.role === "admin") {
      next();
    } else {
      return res.status(403).send("You are not authorized to perform this action");
    }
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).send("Invalid token");
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).send("Token expired");
    } else {
      console.log(err);
      return res.status(500).send("Token verification failed");
    }
  }
};

module.exports = isAdminAuthorized;
