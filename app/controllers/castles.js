const Castles = {
  index: {
    handler: function (request, h) {
      return h.file("./app/views/main.html");
    },
  },
  about: {
    handler: function (request, h) {
      return h.file("./app/views/about.html");
    },
  },
  signup: {
    handler: function (request, h) {
      return h.file("./app/views/signup.html");
    },
  },
  login: {
    handler: function (request, h) {
      return h.file("./app/views/login.html");
    },
  },
};

module.exports = Castles;
