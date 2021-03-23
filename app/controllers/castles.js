"use strict";

const indivInterests = require("../models/indivInterests");
const User = require("../models/user");

const Castles = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Add new POI" });
    },
  },
  
  //Record donation and donor when creating donation
  report: {
    handler: async function (request, h) {
      const castles = await indivInterests.find().populate("member").lean();
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
        const user = await User.findById(id);
        const data = request.payload;
    
        const newIndivInterests = new indivInterests(
          {
            poi: data.poi,
            description: data.description,
            location: data.location,
            member: user._id
          });
        await newIndivInterests.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    }
  },
};

module.exports = Castles;

