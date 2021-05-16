'use strict';

const IndivInterests = require('../models/indivInterests');
const Boom = require("@hapi/boom"); //import boom module

const IndivPOIs = {
  
  // Get All points of interest Endpoint
  find: {
    auth: false,
    handler: async function (request, h) {
      const indivInterests = await IndivPOIs.find();
      return indivInterests;
    },
  },
  
  // Get points of interest Endpoint based on id
  // ID renewed in database seeder each time app is launched. Boom used to cross check ID.
  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const indivInterests = await IndivPOIs.findOne({ _id: request.params.id });
        if (!indivInterests) {
          return Boom.notFound("Invalid POI Id entered");
        }
        return indivInterests;
      } catch (err) {
        return Boom.notFound("Invalid POI Id entered");
      }
    },
  },
  
  
};

module.exports = IndivPOIs;