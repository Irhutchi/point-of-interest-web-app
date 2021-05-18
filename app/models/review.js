"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

// review is associated with poi
const reviewsSchema = new Schema({
  review: String,
  member: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  IndivInterests: {
    type: Schema.Types.ObjectId,
    ref: "IndivInterests",
  }
});

module.exports = Mongoose.model("Review", reviewsSchema);