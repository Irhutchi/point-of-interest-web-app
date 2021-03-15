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
      const castles = await indivInterests.find().lean();
      /*const pointsofinterests = {
        poi = "Lismore Castle",
        description = "description",
        location = "Waterford",
        firstName = "Homer",
        lastName = "Simpson",
      };*/
      return h.view("report", {
        title: "Locations added to Date",
        castles: castles,
      });
    },
  },
  
  addLocation: {
    handler: async function (request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      const data = request.payload;
      
      const newIndivInterests = new indivInterests(
        {
          poi: data.poi,
          description: data.description,
          location: data.location,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      await newIndivInterests.save();
      return h.redirect("/report");
    },
  },
  
  
  /*addLocation: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
    
        const newInterest = new indivInterests(
          {
            poi: data.poi,
            description: data.description,
            location: data.location,
            member: user._id
          });
        await indivInterests.save();
        //var memberEmail = request.auth.credentials.id;
        //data.member = this.users[memberEmail];
        //data.member = this.currentUser;
        //this.pointsofinterests.push(data);
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },*/
};

module.exports = Castles;

