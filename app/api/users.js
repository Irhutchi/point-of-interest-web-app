"use strict";

const utils = require("./utils");
const User = require("../models/user");
const Boom = require("@hapi/boom"); //import boom module

const Users = {
  
  authenticate: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await User.findOne({ email: request.payload.email });
        if (!user) {
          return Boom.unauthorized("User not found");
        } else if (user.password !== request.payload.password) {
          return Boom.unauthorized("Invalid password");
        } else {
          // instead of returning a user object, a JWT is generated and returned.
          const token = utils.createToken(user);
          return h.response({ success: true, token: token }).code(201);
        }
      } catch (err) {
        return Boom.notFound("internal db failure");
      }
    },
  },
  
  
  find: {
    auth: false,
    handler: async function (request, h) {
      const users = await User.find();
      return users;
    },
  },
  
  // Get User Endpoint
  // ID renewed in database seeder each time app is launched. Boom used to cross check ID.
  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await User.findOne({ _id: request.params.id });
        if (!user) {
          return Boom.teapot("Invalid user id");
        }
        return user;
      } catch (err) {
        return Boom.teapot("Invalid user id");
      }
    },
  },
  
  create: {
    auth: false,
    handler: async function (request, h) {
      const newUser = new User(request.payload);
      const user = await newUser.save();
      if (user) {
        return h.response(user).code(201);
      }
      return Boom.badImplementation("error creating user");
    },
  },
  
  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await User.remove({});
      return { success: true };
    },
  },
  
  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const user = await User.deleteOne({ _id: request.params.id });
      if (user) {
        return { success: true };
      }
      return Boom.notFound("id not found or missing");
    },
  },
};

module.exports = Users;
