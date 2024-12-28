const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  displayName: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
  password: String,
});

module.exports = mongoose.model("User", userSchema);
