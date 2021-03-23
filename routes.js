"use strict";

const Accounts = require("./app/controllers/accounts");
const Castles = require("./app/controllers/castles");

module.exports = [
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/about", config: Accounts.about },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "GET", path: "/settings", config: Accounts.showSettings },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },
  { method: "POST", path: "/settings", config: Accounts.updateSettings },
  
  { method: "GET", path: "/home", config: Castles.home },
  { method: "POST", path: "/addLocation", config: Castles.addLocation },
  { method: "GET", path: "/report", config: Castles.report },
  { method: "GET", path: "/del-indivInterest/{_id}", config: Castles.removepoi },
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
