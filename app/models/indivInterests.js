"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

// indivdual poi's refer to categories
const indivInterestsSchema = new Schema({
  poi: String,
  description: String,
  latitude: Number,
  longitude: Number,
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