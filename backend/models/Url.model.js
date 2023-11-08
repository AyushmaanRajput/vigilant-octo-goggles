const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  originalUrl: String,
  shortUrl: String,
  expiresAt: Date,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const URL = mongoose.model("Url", UrlSchema);

module.exports = URL;
