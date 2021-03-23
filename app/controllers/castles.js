"use strict";

const IndivInterests = require("../models/indivInterests");
const Category = require("../models/category");
const User = require("../models/user");

const Castles = {
  home: {
    handler: async function (request, h) {
      const categories = await Category.find().lean();
      return h.view("home", {
        title: "Add new POI",
        categories: categories
      });
    },
  },
  
  //Record new poi and member when creating point of interest
  report: {
    handler: async function (request, h) {
      const castles = await IndivInterests.find().populate("member").populate("category").lean();
      return h.view("report", {
        title: "Locations added to Date",
        castles: castles,
      });
    },
  },
  
  addLocation: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id); // locate User object
        const data = request.payload;
  
        const rawCategory = request.payload.category;
        const category = await Category.findOne({  // locate category object
          region: rawCategory
        });
        // Create new point of interest & init with User and category Id's
        const newIndivInterest = new IndivInterests(
          {
            poi: data.poi,
            description: data.description,
            location: data.location,
            member: user._id,
            category: category._id
          });
        await newIndivInterest.save();  // save new individual interest
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    }
  },
};

module.exports = Castles;

