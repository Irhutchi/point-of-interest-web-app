"use strict";

// import and register plugins //
const env = require('dotenv');
const Joi = require("@hapi/joi");
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Cookie = require("@hapi/cookie");
const utils = require("./app/api/utils.js");

const Handlebars = require('handlebars');
require('./app/models/db');

// The dotenv component loads the values in the `process.env` which is then accessed.
const result = env.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

//console.log(process.env)

/* Server is the container for the hapi application.
   All other Hapi objects are created or used in the context of a server.
   Make connections from server to 'speak' to the outside world. */
const server = Hapi.server({
  port: process.env.PORT || 3000,
  //port: 3000,
  //host: 'localhost',
});


async function init() {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(require('hapi-auth-jwt2'));
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
  
  server.auth.strategy("jwt", "jwt", {
    key: "secretpasswordnotrevealedtoanyone",
    validate: utils.validate,
    verifyOptions: { algorithms: ["HS256"] },
  });
  
  server.auth.default("session");
  server.route(require('./routes'));
  server.route(require('./routes-api'));
  
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();