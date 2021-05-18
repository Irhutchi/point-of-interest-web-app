"use strict";

const assert = require("chai").assert;
const TestAPIService = require("./test-api-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("User API tests", function () {
  let users = fixtures.users;
  let newUser = fixtures.newUser;
  
  const poiService = new TestAPIService(fixtures.testapiservice);
  
  //clear our the categories model so that each test can be considered completely independently
  setup(async function () {
    await poiService.deleteAllUsers();
  });
  
  teardown(async function () {
    await poiService.deleteAllUsers();
  });
  
  test("Create a User", async function () {
    const returnedUser = await poiService.createUser(newUser);
    assert(_.some([returnedUser], newUser), "returnedUser must be a superset of newUser");
    assert.isDefined(returnedUser._id);
  });
  
  test("get user", async function () {
    const user1 = await poiService.createUser(newUser);
    const user2 = await poiService.getUser(user1._id);
    assert.deepEqual(user1, user2);
  });
  
  test("Get Invalid User", async function () {
    const user1 = await poiService.getUser("nonuser");
    assert.isNull(user1);
    const user2 = await poiService.getUser("qwertyqwertyqwerty");
    assert.isNull(user2);
  });
  
  test("Delete a User", async function () {
    let u = await poiService.createUser(newUser);
    assert(u._id != null);
    await poiService.deleteOneUser(u._id);
    u = await poiService.getUser(u._id);
    assert(u == null);
  });
  
  test("Get All Users", async function () {
    for (let i of users) {
      await poiService.createUser(i);
    }
    
    const allUsers = await poiService.getUsers();
    assert.equal(allUsers.length, users.length);
  });
  
  test("Get Users Detail", async function () {
    for (let i of users) {
      await poiService.createUser(i);
    }
    
    const allUsers = await poiService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), "returnedUser must be a superset of newUser");
    }
  });
  
  test("Get All Users Empty", async function () {
    const allUsers = await poiService.getUsers();
    assert.equal(allUsers.length, 0);
  });
});