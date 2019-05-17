
console.log('Polyfills loaded 😊')

// Promise polyfill
if (!window.Promise) window.Promise = require('es6-promise').Promise;

// Object.assign polyfill
if (!Object.assign) require('es6-object-assign').polyfill();

// Array.from polyfill (Needed for Babel [...array] transformation)
if (!Array.from) Array.from = require('array-from');
