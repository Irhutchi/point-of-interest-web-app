'use strict';

const Categories = require('./app/api/categories');
const IndivPOIs = require('./app/api/indivInterests');

module.exports = [
  { method: 'GET', path: '/api/categories', config: Categories.find },
  { method: 'GET', path: '/api/categories/{id}', config: Categories.findOne },
  
  { method: 'GET', path: '/api/indivInterests', config: IndivPOIs.find },
  { method: 'GET', path: '/api/indivInterests/{id}', config: IndivPOIs.findOne },
  
  { method: "POST", path: "/api/candidates", config: Candidates.create },
  { method: "DELETE", path: "/api/candidates/{id}", config: Candidates.deleteOne },
  { method: "DELETE", path: "/api/candidates", config: Candidates.deleteAll },
];