"use strict";

const IndivInterests = require("../models/indivInterests");
const Category = require("../models/category");
const User = require("../models/user");
const Review = require("../models/review");
const Joi = require('@hapi/joi');
const sanitizeHtml = require('../utils/sanitisingHTML');

const Castles = {
  home: {
    handler: async function (request, h) {
      const categories = await Category.find().lean();
      const id = request.auth.credentials.id;
      const user = await User.findById(id); // locate User Object
      return h.view("home", {
        title: "Add new POI",
        categories: categories, // POI handler needs categories lift for view
        firstName: user.firstName,
        lastName: user.lastName
      });
    },
  },
  
  //Record new poi and member when creating point of interest
  report: {
    handler: async function (request, h) {
      const castles = await IndivInterests.find().populate("member").populate("category").lean();
      let total = 0;
      castles.forEach((pois) => {
        total += pois.length;
      });
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
        const user = await User.findById(id); // locate User Object
        const data = request.payload;
  
        const rawCategory = request.payload.category;
        const category = await Category.findOne({  // locate Category Object
          region: rawCategory
        });
        // Create new point of interest & init with User and category Id's
        const newIndivInterest = new IndivInterests(
          {
            poi: sanitizeHtml(data.poi),
            description: sanitizeHtml(data.description),
            latitude: sanitizeHtml(data.latitude),
            longitude: sanitizeHtml(data.longitude),
            //location: sanitizeHtml(data.location),
            member: user._id,
            category: category._id
          });
        console.log('POI added with' + newIndivInterest);
        await newIndivInterest.save();  // save new individual interest
        return h.redirect("report");
      } catch (err) {
        return h.view("home", { errors: [{ message: err.message }] });
      }
    }
  },
  

  
  addCategory: {
    handler: async function (request, h)
    {
      try
      {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        
        const newCategory = new Category({
          region: data.category,
        });
        await newCategory.save();
        return h.redirect("/home");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }]
        });
      }
    }
  },
  
 
  
  
  // function to display (update) point of interest
  showPOISettings: {
    handler: async function(request, h) {
      try {
       const indivInterestsId = request.params.id;
       const poi = await IndivInterests.findById(indivInterestsId).lean();
       const category = await Category.find().lean();
       return h.view('updatePOI', {
         title: 'Edit Point of Interest',
         poi:poi,
         categories: category
       });
      } catch (err) {
        return h.view("updatePOI", {
          errors: [{ message: err.message }]
        });
      }
    }
  },
  // function to provide user to update indexes
  updateCastlePoi: {
    validate: {
      payload: {
        category: Joi.string().required(),
        poi: Joi.string().required(),
        description: Joi.string().required(),
        latitude: Joi.number(),
        longitude: Joi.number(),
      },
      options: {
        abortEarly: false
      },
      failAction: function(request, h, error) {
        return h
          .view("updatePOI", {
            title: "POI update error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    
    handler: async function(request, h) {
      try {
        const editPoi = request.payload;
        console.log(editPoi);
        const id = request.auth.credentials.id;
        const indivInterests = await IndivInterests.findById(request.params.id);
  
        indivInterests.poi = editPoi.poi;
        indivInterests.description = editPoi.description;
        indivInterests.category = editPoi.category;
        indivInterests.latitude = editPoi.latitude;
        indivInterests.longitude = editPoi.longitude;
        
        await indivInterests.save();
        return h.redirect("/report");
      }catch (err) {
        return h.view("updatePOI", {
          errors: [{ message: err.message }]
        });
      }
    },
    
  },
  
  // delete poi, save changes and refresh the report page.
  removepoi: {
    handler: async function (request, h) {
      try {
        const castles = IndivInterests.findById(request.params._id);
        console.log("Deleting: " + castles);
        await castles.deleteOne();
        return h.redirect("/report");
      } catch
        (err) {
        return h.view('home', {errors: [{message: err.message}]});
      }
    },
  },
  
  
  //----   Reviews   ----//
  showReview: {
    handler: async function(request, h) {
      try {
        const indivInterestsId = request.params.id;
        const poi = await IndivInterests.findById(indivInterestsId).lean();
        const reviews = await Review.find({ IndivInterests: request.params.id
        }).populate("member").populate("IndivInterests").lean();
        
        return h.view('reviewPOI', {
          reviews: reviews,
          poi: poi
        });
      } catch (err) {
        return h.view("report", {
          errors: [{ message: err.message }]
        });
      }
    }
  },
  
  addReview: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id); // locate User Object
        //const indivInterests = request.params.id;
        const indivInterests = await IndivInterests.findById(request.params.id);
        //const poi = await IndivInterests.findById(indivInterestsId).lean();
        const data = request.payload;
        // Create new point of interest & init with User and category Id's
        const newReview = new Review ({
          review: sanitizeHtml(data.review),
          rating: sanitizeHtml(data.rating),
          member: user._id,
          IndivInterests: indivInterests._id //sanitizeHtml(data.Indivinterests),
        });
        const review = await newReview.save();  // save new individual interest
        if (review) {
          console.log("Review added")
        } else {
          console.log("Error adding review")
        }
        return h.redirect("/reviewPOI/" + request.params.id);
      } catch (err) {
        return h.view("report", { errors: [{ message: err.message }] });
      }
    }
  },
 
  
};

module.exports = Castles;
