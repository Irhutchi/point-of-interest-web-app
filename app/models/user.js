"use strict";

const Mongoose = require("mongoose");
const Boom = require("@hapi/boom");
const Schema = Mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});


userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email : email});
};

userSchema.methods.comparePassword = async function(userPassword) {
  //isMatch is the result bcrypt comparison. bcrypt will then return a boolean value
  const isMatch = await bcrypt.compare(userPassword, this.password);
  if (!isMatch) {
    throw Boom.unauthorized('Password mismatch');
  }
  return this;
};

//User module used in other modules to interact with the "User" collection
module.exports = Mongoose.model("User", userSchema);