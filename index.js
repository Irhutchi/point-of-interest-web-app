"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

async function init() {
  await server.register(Inert);
  server.route(require("./routes"));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
