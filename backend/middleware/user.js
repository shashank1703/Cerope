const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ msg: "No token provided, access denied" });
    }

    const words = token.split(" ");
    const jwtToken = words[1];

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (decoded.id) {
      req.userId = decoded.id; // attach userId to request
      next();
    } else {
      return res.status(403).json({ msg: "Invalid token, access denied" });
    }
  } catch (err) {
    return res.status(403).json({ msg: "Authentication failed" });
  }
};

module.exports = authMiddleware;