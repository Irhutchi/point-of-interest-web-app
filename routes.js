"use strict";

const Accounts = require("./app/controllers/accounts");
const Castles = require("./app/controllers/castles");

module.exports = [
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/about", config: Accounts.about },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  //Using OAuth strategy to give app access to GitHub profile.
  /*{ method: 'GET', path: '/login',
    config: {
      auth: 'github-oauth',
      handler: function (request, h) {
        if (request.auth.isAuthenticated) {
          request.cookieAuth.set(request.auth.credentials);
          return h.view('home');
        }
        return('Not logged in...');
      }
    }
  },*/
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "GET", path: "/settings", config: Accounts.showSettings },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },
  { method: "POST", path: "/settings", config: Accounts.updateSettings },
  
  { method: "GET", path: "/home", config: Castles.home },
  { method: "GET", path: "/report", config: Castles.report },
  { method: "POST", path: "/addLocation", config: Castles.addLocation },
  { method: "POST", path: "/add-category", config: Castles.addCategory },
  { method: 'GET', path: '/updatePOI/{id}', config: Castles.showPOISettings },
  { method: "POST", path: "/updatePOI/{id}", config: Castles.updateCastlePoi },
  { method: "GET", path: "/del-indivInterest/{_id}", config: Castles.removepoi },
  { method: "GET", path: "/reviewPOI/{id}", config: Castles.showReview },
  { method: "POST", path: "/add-review/{id}", config: Castles.addReview },
  
  //restricting access on routes with scope requirements
  {
    method: 'GET',
    path: '/admin',
    config: {
      auth: {
        strategy: 'session',
        scope: 'admin'   //only allow users to access this route that have the admin scope in their authenticated credentials
      },
      handler: (request, h) => {
        return h.view('admin')
      }
    }
  },
  
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public"
      }
    },
    options: { auth: false }
  }
];
