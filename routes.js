const Castles = require("./app/controllers/castles.js");

module.exports = [
  { method: "GET", path: "/", config: Castles.index },
  { method: "GET", path: "/signup", config: Castles.signup },
  { method: "GET", path: "/login", config: Castles.login },

  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
  },
];
