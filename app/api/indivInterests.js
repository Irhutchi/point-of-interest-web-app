'use strict';

const IndivInterests = require('../models/indivInterests');
const Category = require("../models/category");
const Boom = require("@hapi/boom"); //import boom module

const IndivPOIs = {
  
  // Get All points of interest Endpoint
  find: {
    auth: false,
    handler: async function (request, h) {
      const indivInterest = await IndivInterests.find();
      return indivInterest;
    },
  },
  
  // Get points of interest Endpoint based on id
  // ID renewed in database seeder each time app is launched. Boom used to cross check ID.
  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const indivInterests = await IndivInterests.findOne({ _id: request.params.id });
        if (!indivInterests) {
          return Boom.notFound("Invalid Id entered");
        }
        return indivInterests;
      } catch (err) {
        return Boom.notFound("Invalid Id entered");
      }
    },
  },
  
  
  findByCategory: {
    auth: false,
    handler: async function (request, h) {
      try {
        const indivInterest = await IndivInterests.find({ category: request.params.id });
        if(!indivInterest) {
          return Boom.badRequest("Invalid category Id entered");
        }
        return indivInterest;
      } catch (err) {
        return Boom.badRequest("Invalid category Id entered");
      }
    },
  },
  
  create: {
    auth: false,
    handler: async function (request, h) {
      const newInterest = new IndivInterests(request.payload);
      const indivInterest = await newInterest.save();
      if (indivInterest) {
        return h.response(indivInterest).code(201);
      }
      return Boom.badImplementation("error creating poi");
    },
  },
  
  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await IndivInterests.deleteMany({});
      return { success: true };
    },
  },
  
  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const indivInterest = await IndivInterests.deleteOne({ _id: request.params.id });
      if (indivInterest) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
  
  
};

module.exports = IndivPOIs;