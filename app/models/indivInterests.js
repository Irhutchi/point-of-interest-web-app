"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const indivInterestsSchema = new Schema({
  poi: String,
  description: String,
  location: String,
  member: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

module.exports = Mongoose.model("IndivInterests", indivInterestsSchema);