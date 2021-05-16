'use strict';

// model used to represent a Category
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const categorySchema = Schema({
  region: String,
});

module.exports = Mongoose.model('Category', categorySchema);