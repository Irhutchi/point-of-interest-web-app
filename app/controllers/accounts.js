'use strict';

const User = require('../models/user');
const Boom = require("@hapi/boom"); //import boom module
const Joi = require('@hapi/joi');  //import joi module
const bcrypt = require("bcryptjs");
const saltRounds = 10;    // "cost factor" than controls the time taken to calculate the hash
const sanitizeHtml = require('../utils/sanitisingHTML');

const Accounts = {
  
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view('main' , {title:"Explore Irish Castles Online"});
    },
  },
  about: {
    handler: function (request, h) {
      return h.view('about' , {title:"About Irish Castles"});
    },
  },
  // function to display the sign up page
  showSignup: {
    auth: false,
    handler: function(request, h) {
      return h.view('signup', { title: 'Sign-up' });
    }
  },
  /* function allows a new user to register
     validation will ensure a user enters the required fields & the correct input   */
  signup: {
    auth: false,
    validate: {
      payload: {
        // begin with upper case letter and then 2+ lower case letters
        firstName: Joi.string().regex(/^[a-zA-Z][a-z]{2,}$/),
        // begin with upper case letter, then any 2+ characters
        lastName: Joi.string().regex(/^[a-zA-Z]/).min(3),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
      },
      // report all errors by including options property
      options: {
        abortEarly: false,
      },
      // if validation fails, render sign up page
      failAction: function (request, h, error) {
        return h
          .view("signup", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    /* create a new user object & send the user information to database.
       errors handled using try/catch block */
    handler: async function (request, h) {
      try {
        const payload = request.payload;
        let user = await User.findByEmail(payload.email);
        if (user) {
          const message = "Email address is already registered";
          throw Boom.badData(message);
        }
        // write hash of PW to user model // Store hash in DB instead of password.
        const hash = await bcrypt.hash(payload.password, saltRounds);
        
        const newUser = new User({
          firstName: sanitizeHtml(payload.firstName),
          lastName: sanitizeHtml(payload.lastName),
          email: sanitizeHtml(payload.email),
          password: sanitizeHtml(hash),
        });
        user = await newUser.save();
        // set the cookie if correct user credentials are presented
        request.cookieAuth.set({ id: user.id });
        
        return h.redirect("/home");
      } catch (err) {
        return h.view("signup", { errors: [{ message: err.message }] });
      }
    },
  },
  
  // function to display the login page
  showLogin: {
    auth: false,
    handler: function(request, h) {
      return h.view('login', { title: 'Login' });
    }
  },
  
  /* only let user in if previously signed up
     provide validation to ensure email and password fields are entered */
  login: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      // if validation fails, render login page
      failAction: function (request, h, error) {
        return h
          .view("login", {
            title: "Login error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    /* if the user doesn't exist return message to user
       if user exists in DB compare password entered with user password
     */
    handler: async function (request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        await user.comparePassword(password);
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/home");
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  // function to show settings page
  showSettings: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();  //lean will transform the object into a simple javascript object
        return h.view("settings", { title: "Profile Settings", user: user });
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    }
  },
  
  
  // update user settings and ensure correct pattern and is used.
  updateSettings: {
    validate: {
      payload: {
        // begin with upper case letter and then 2+ lower case letters
        firstName: Joi.string().regex(/^[a-zA-Z][a-z]{2,}$/),
        // begin with upper case letter, then any 2+ characters
        lastName: Joi.string().regex(/^[a-zA-Z]/).min(3),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("settings", {
            title: "Settings error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const hash = await bcrypt.hash(payload.password, saltRounds);
      try {
        const userEdit = request.payload;
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        user.firstName = sanitizeHtml(userEdit.firstName);
        user.lastName = sanitizeHtml(userEdit.lastName);
        user.email = sanitizeHtml(userEdit.email);
        user.password = sanitizeHtml(userEdit.hash);
        await user.save();
        return h.redirect("/settings");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  // clear cookie authentication when user logs out.
  logout: {
    handler: function(request, h) {
      request.cookieAuth.clear();  // cookie deleted.
      return h.redirect('/');
    }
  }
};

module.exports = Accounts;