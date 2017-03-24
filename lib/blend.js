var exec = require('child_process').exec
var fs = require('fs');
var path = require('path')
var say = require('say.js').dev

// import pmongo from 'promised-mongo';
var pmongo = require('promised-mongo')

if (process.env.MONGODB_URI) MONGODB_URI = process.env.MONGODB_URI;




var Blend = (function() {
  function Blend() {}

  Blend.prototype.start = function(MONGODB_URI,query,callback) {

    const db = pmongo(MONGODB_URI, {
      authMechanism: 'ScramSHA1'
    }, ['users']);

    eval(query)

  };
  return Blend;

})();
module.exports = new Blend;
