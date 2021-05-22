"use strict";

// import and register plugins //
const env = require('dotenv');
const Joi = require("@hapi/joi");
const Hapi = require('@hapi/hapi');
const Bell = require('@hapi/bell');
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
  port: process.env.PORT || 4000,
  routes: { cors: true },
});


async function init() {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);  // Register hapi auth cookie with the server
  await server.register(require('hapi-auth-jwt2'));
  await server.register(Bell);  // Register bell with the server
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
      name: process.env.cookie_name,  //Name of the cookie to be set
      password: process.env.cookie_password, // String used to encrypt cookie
      isSecure: false,
    },
    redirectTo: "/", //a better user experience would be to redirect the user to the start page
  });
  
  server.auth.strategy("jwt", "jwt", {
    key: process.env.jwtkey,
    validate: utils.validate,
    verifyOptions: { algorithms: ["HS256"] },
  });
  
  let bellAuthOptions = {
    provider: 'github',
    password: 'github-encryption-password-secure', // String used to encrypt cookie
    // used during authorisation steps only
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,  // *** Replace with your app Client Secret ***
    isSecure: false        // Should be 'true' in production software (requires HTTPS)
  };
  
  server.auth.strategy('github-oauth', 'bell', bellAuthOptions);
  
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