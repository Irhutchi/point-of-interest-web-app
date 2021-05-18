"use strict";

const assert = require("chai").assert;
const TestAPIService = require("./test-api-service");
const fixtures = require("./fixtures.json");
const utils = require("../app/api/utils.js");

suite("Authentication API tests", function () {
  let users = fixtures.users;
  let newUser = fixtures.newUser;
  
  const poiService = new TestAPIService(fixtures.testapiservice);
  
  //clear our the categories model so that each test can be considered completely independently
  setup(async function () {
    await poiService.deleteAllUsers();
  });
  
  
  test("authenticate", async function () {
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
    assert(response.success);
    assert.isDefined(response.token);
  
    console.log(response);
  });
    
  //test to verify that the token is correctly encoded
  test("verify Token", async function () {
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
    
    //userId and email can be successfully recovered from the token
    const userInfo = utils.decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});
