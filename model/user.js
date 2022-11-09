const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    unique: true,
    required: true,
    type: String,
  },
  password: String,
  gender: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel; // (EXPORT DEFAULT, DEFAULT EXPORT GIVES IT THE ABILITY TO BE USED ELSE WHERE )
