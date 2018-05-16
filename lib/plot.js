var fs = require('fs');
var path = require('path')
var say = require('say.js').dev
var pmongo = require('promised-mongo');

var Plot = (function() {
  function Plot() {}

  Plot.prototype.start = function(db,op,callback) {
    console.log('our db instance ->', db)
    console.log('starting blend -', op)
    eval(op.query).then((result) => {
      // console.log('got result from db', result)
      return callback
    })
  };

  return Plot;

})();

module.exports = new Plot;

