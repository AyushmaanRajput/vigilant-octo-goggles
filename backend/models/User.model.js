// User Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  urls: [
    {
      type: Schema.Types.ObjectId,
      ref: "Url",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
