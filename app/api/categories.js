'use strict';

const Category = require('../models/category');
const Boom = require("@hapi/boom"); //import boom module

const Categories = {
  
  // Get All Candidate Endpoint
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const categories = await Category.find();
      return categories;
    },
  },
  
  // Get Candidate Endpoint
  // ID renewed in database seeder each time app is launched. Boom used to cross check ID.
  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = await Category.findOne({ _id: request.params.id });
        if (!category) {
          return Boom.teapot("No Category with this id");
        }
        return category;
      } catch (err) {
        return Boom.teapot("No Category with this id");
      }
    },
  },
  
  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const newCategory = new Category(request.payload);
      const category = await newCategory.save();
      if (category) {
        return h.response(category).code(201);
      }
      return Boom.badImplementation("error creating category");
    },
  },
  
  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      await Category.deleteMany({});
      return { success: true };
    },
  },
  
  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const category = await Category.deleteOne({ _id: request.params.id });
      if (category) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
  
};

module.exports = Categories;