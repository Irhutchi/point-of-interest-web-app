'use strict';

// model used to represent a Category
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const categorySchema = Schema({
  region: String
  /*north: String,
  south: String,
  east: String,
  west: String*/
});

module.exports = Mongoose.model('Category', categorySchema);