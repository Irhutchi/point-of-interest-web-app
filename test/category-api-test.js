"use strict";

const assert = require("chai").assert;
const axios = require("axios");

suite("Category API tests", function () {
  test("get categories", async function () {
    const response = await axios.get("http://localhost:3000/api/categories");
    const categories = response.data;
    assert.equal(4, categories.length);
  
    assert.equal(categories[0].region, "North");
    assert.equal(categories[1].region, "East");
    assert.equal(categories[2].region, "South");
    assert.equal(categories[3].region, "West");
    
    console.log(response.data);
  });
  
  test("get one candidate", async function () {
    let response = await axios.get("http://localhost:3000/api/categories");
    const categories = response.data;
    assert.equal(4, categories.length);
    
    const singleCategoryUrl = "http://localhost:3000/api/categories/" + categories[0]._id;
    response = await axios.get(singleCategoryUrl);
    const singleCandidate = response.data;
    
    assert.equal(singleCandidate.region, "North");
    
  });
  
});