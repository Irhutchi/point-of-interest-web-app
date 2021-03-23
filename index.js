"use strict";

// import and register plugins //
const env = require('dotenv');
const Joi = require("@hapi/joi");
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Cookie = require("@hapi/cookie");
const Handlebars = require('handlebars');
require('./app/models/db');

const result = env.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}


/* Server is the container for the hapi application.
   All other Hapi objects are created or used in the context of a server.
   Make connections from server to 'speak' to the outside world. */
const server = Hapi.server({
  port: process.env.PORT || 3000,
  //port: 3000,
  //host: 'localhost',
});

//before server launches 'bind' an array of users/donations to the server obj
//seperate out user location interests
//server.bind({
  //currentUser: {}, //{} hold key-value pairs
  //user: {},
  //pointsofinterests: [], //[] stores and array of values, ie. POI's added.
//});

async function init() {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  server.validator(require("@hapi/joi"));
  server.views({
    engines: {
      hbs: require('handlebars'), // initialise to use handlebars engine
    },
    // define template locations and cache settings
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layouts',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false,
  });
  
  //Cookie Configuration - pass, name, ttl (expiry) - default time to live (1 day)
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/", //a better user experience would be to redirect the user to the start page
  });
  
  server.auth.default("session");
  server.route(require('./routes'));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();