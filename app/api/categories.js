'use strict';

const Category = require('../models/category');
const Boom = require("@hapi/boom"); //import boom module

const Categories = {
  
  // Get All Candidate Endpoint
  find: {
    auth: false,
    handler: async function (request, h) {
      const categories = await Category.find();
      return categories;
    },
  },
  
  // Get Candidate Endpoint
  // ID renewed in database seeder each time app is launched. Boom used to cross check ID.
  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const category = await Category.findOne({ _id: request.params.id });
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        return category;
      } catch (err) {
        return Boom.notFound("No Category with this id");
      }
    },
  },
  
  
};

module.exports = Categories;