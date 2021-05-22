'use strict';

const sanitizeHtml = require('sanitize-html');

//const result = await cloudinary.v2.api.resources();
const cleanHtml = function(inputToClean) {
  return sanitizeHtml(inputToClean, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: { 'a': ['href'] },
    allowedIframeHostnames: ['www.wit.ie']
  });
}

module.exports = cleanHtml;