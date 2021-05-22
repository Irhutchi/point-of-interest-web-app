"use strict";

const assert = require("chai").assert;
const TestAPIService = require("./test-api-service");
const fixtures = require("./fixtures.json");
const _ = require("lodash");

suite("Category API tests", function () {
    let categories = fixtures.categories;
    let newCategory = fixtures.newCategory;
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
    
    //clear our the categories model so that each test can be considered completely independently
    setup(async function () {
      await poiService.deleteAllCategories();
    });
    
    teardown(async function () {
      await poiService.deleteAllCategories();
    });
 
    test("create a category", async function () {
      const returnedCategory = await poiService.createCategory(newCategory);
      assert.equal(returnedCategory.region, newCategory.region);
      assert.isDefined(returnedCategory._id);
    });
    
    test("get category", async function () {
      const catOne = await poiService.createCategory(newCategory);
      const catTwo = await poiService.getCategory(catOne._id);
      assert.deepEqual(catOne, catTwo);
    });
    
    test("check invalid category", async function () {
      const catOne = await poiService.getCategory("South-End");
      assert.isNull(catOne);
      const catTwo = await poiService.getCategory("0123456789876543210");
      assert.isNull(catTwo);
    });
    
    test("delete a category", async function () {
      let c = await poiService.createCategory(newCategory);
      assert(c._id != null);
      await poiService.deleteOneCategory(c._id);
      c = await poiService.getCategory(c._id);
      assert(c == null);
    });
    
    test("get all categories", async function () {
      for (let i of categories) {
        await poiService.createCategory(i);
      }
      const allCategories = await poiService.getCategories();
      assert.equal(allCategories.length, categories.length);
    });
    
    test("get category detail", async function () {
      for (let i of categories) {
        await poiService.createCategory(i);
      }
      const allCategories = await poiService.getCategories();
      for (var i = 0; i < categories.length; i++) {
        assert(_.some([allCategories[i]], categories[i]), "returnedCandidate must be a superset of newCandidate");
      }
    });
    
    test("get all categories empty", async function () {
      const allCategories = await poiService.getCategories();
      assert.equal(allCategories.length, 0);
    });
});




