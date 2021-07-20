const mongoose = require("mongoose");
const Schema = mongose.Schema;

const reviewScheme = new Schema({
  body: String,
  rating: Number,
});

module.exports = mongoose.model("Review", reviewSchema);
