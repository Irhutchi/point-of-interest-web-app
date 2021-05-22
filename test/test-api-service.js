"use strict";

/*Encapsulating both the http requests and the castles service access into a single class.
* This class simplifies test creation and enables you to easily devise more tests as the API evolves.
* We call the class Test-API-Service, and it assumes we are always dealing with JSON payloads.
*/

const axios = require("axios");
//const baseUrl = "http://DESKTOP-T58FBJJ:4000";

class TestAPIService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  
  
  async getCategories() {
    const response = await axios.get(this.baseUrl + "/api/categories");
    return response.data;
    //console.log(response.data);
  } catch (e) {
    return null;
  }
  
  async getCategory(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/categories/" + id);
      return response.data;
      //console.log(response.data);
    } catch (e) {
      return null;
    }
  }
  
  async createCategory(newCategory) {
    const response = await axios.post(this.baseUrl + "/api/categories", newCategory);
    return response.data;
    //console.log(response.data);
  }
  
  async deleteAllCategories() {
    const response = await axios.delete(this.baseUrl + "/api/categories");
    return response.data;
    
  }
  
  async deleteOneCategory(id) {
    const response = await axios.delete(this.baseUrl + "/api/categories/" + id);
    return response.data;
  }
  
  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users/authenticate", user);
      //provide the user with JWT token just received upon access from Authorisation header
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async clearAuth(user) {
    axios.defaults.headers.common["Authorization"] = "";
  }
  
  async getUsers() {
    const response = await axios.get(this.baseUrl + "/api/users");
    return response.data;
  }
  
  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  
  async createUser(newUser) {
    const response = await axios.post(this.baseUrl + "/api/users", newUser);
    return response.data;
  }
  
  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }
  
  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  
  async getIndivInterest(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/indivInterests/" + id);
      return response.data;
      //console.log(response.data);
    } catch (e) {
      return null;
    }
  }
  
  async getAllInterests() {
    try {
      const response = await axios.get(this.baseUrl + "/api/indivInterests" );
      return response.data;
      //console.log(response.data);
    } catch (e) {
      return null;
    }
  }
  
  async createIndivInterest(newInterest) {
    try {
      const response = await axios.post(this.baseUrl + "/api/indivInterests", newInterest);
      return response.data;
      //console.log(response.data);
    } catch (e) {
      return null;
    }
  }
  
  async deleteAllIndivInterest() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/indivInterests");
      return response.data;
      
    } catch (e) {
      return null;
    }
  }
  
  async deleteOneIndivInterest(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/indivInterests/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  
}

module.exports = TestAPIService;