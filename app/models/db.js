"use strict";

const env = require('dotenv');
env.config();

const Mongoose = require("mongoose");

Mongoose.set("useNewUrlParser", true);
Mongoose.set("useUnifiedTopology", true);

Mongoose.connect(process.env.db);
const db = Mongoose.connection;

db.on("error", function(err) {
  console.log(`database connection error: ${err}`);
});

db.on("disconnected", function() {
  console.log("database disconnected");
});

db.once("open", function() {
  console.log(`database connected to ${this.name} on ${this.host}`);
  seed();
});

/* On application startup, delete any existing data in collections.
   Populate the database on initial connection during startup. */
async function seed() {
  var seeder = require("mais-mongoose-seeder")(Mongoose);
  const data = require("./seed-data.json");
  const IndivInterests = require("./indivInterests");
  const Category = require("./category.js");
  const User = require("./user");
  const Admin = require("./admin");
  const dbData = await seeder.seed(data, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}
