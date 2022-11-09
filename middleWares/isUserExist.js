const userModel = require("../model/user");

module.exports = async (req, res, next) => {
  const { id } = res.locals;
  try {
    const userExist = await userModel.findById(id);
    if (userExist) {
      next();
    } else {
      res.status(404).json({ status: false, msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: "Something went Wrong" });
  }
};
