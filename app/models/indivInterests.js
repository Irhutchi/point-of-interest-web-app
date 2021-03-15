"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const indivInterestsSchema = new Schema({
  poi: String,
  description: String,
  location: String,
  firstName: String,
  lastName: String
  
});

module.exports = Mongoose.model("indivInterests", indivInterestsSchema);