"use strict";

const assert = require("chai").assert;
const TestAPIService = require("./test-api-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("User API tests", function () {
  let indivInterests = fixtures.indivInterests;
  let newInterest = fixtures.newInterest;
  let newUser = fixtures.newUser;
  
  const poiService = new TestAPIService(fixtures.testapiservice);
  
  //delete all users, then create a new user and then authenticate this user to the service
  suiteSetup(async function () {
    await poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
  });
  
  //delete all users, then remove the authorisation token.
  suiteTeardown(async function () {
    await poiService.deleteAllUsers();
    poiService.clearAuth();
  });
  
  //clear our the indivInterests model so that each test can be considered completely independently
  setup(async function () {
    await poiService.deleteAllIndivInterest();
  });
  
  teardown(async function () {
    await poiService.deleteAllIndivInterest();
  });
  
  
  test("Create a new poi", async function () {
    const returnedInterest = await poiService.createIndivInterest(newInterest);
    assert(_.some([returnedInterest], newInterest), "returnedInterest must be a superset of newInterest");
    assert.isDefined(returnedInterest._id);
  });
  
  test("get individual interests", async function () {
    const interest1 = await poiService.createIndivInterest(newInterest);
    const interest2 = await poiService.getIndivInterest(interest1._id);
    assert.deepEqual(interest1, interest2);
  });
  
  
  test("Get All user interests", async function () {
    for (let i of indivInterests) {
      await poiService.createIndivInterest(i);
    }
    const allInterests = await poiService.getAllInterests();
    assert.equal(allInterests.length, indivInterests.length);
  });
  
  
  test("Get POI Detail", async function () {
    for (let i of indivInterests) {
      await poiService.createIndivInterest(i);
    }
    const allInterests = await poiService.getAllInterests();
    for (var i = 0; i < indivInterests.length; i++) {
      assert(_.some([allInterests[i]], indivInterests[i]), "returnedInterest must be a superset of newInterest");
    }
  });
  
  test("Get Invalid interests", async function () {
    const interest1 = await poiService.getIndivInterest("invalid");
    assert.isNull(interest1);
    const interest2 = await poiService.getIndivInterest("qwertyqwertyqwerty");
    assert.isNull(interest2);
  });
  
  
  test("Delete a individual poi", async function () {
    let PoI = await poiService.createIndivInterest(newInterest);
    assert(PoI._id != null);
    await poiService.deleteOneIndivInterest(PoI._id);
    PoI = await poiService.getIndivInterest(PoI._id);
    assert(PoI == null);
  });
  
  test("Get All points of interest Empty", async function () {
    const allInterests = await poiService.getAllInterests();
    assert.equal(allInterests.length, 0);
  });
  
});