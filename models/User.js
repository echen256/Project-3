const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String, required: true }
});

const User = module.exports = mongoose.model("User", userSchema);
