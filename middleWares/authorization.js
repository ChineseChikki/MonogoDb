const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization;
  try {
    //Checks if the Token Exist
    if (token) {
      //verifies the token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // Attach the decoded data to the res.locals object
      res.locals.id = decoded.id;
      // send the request to the next middleware
      next();
    } else {
      res.status(404).json({ success: false, msg: "No Token" });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: "Invalid Token" });
  }
};
