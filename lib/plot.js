var fs = require('fs');
var path = require('path')
var say = require('say.js').dev;
var pmongo = require('promised-mongo');

var Plot = (function() {
  function Plot() {}

  Plot.prototype.start = function(db,op,callback) {
    say('our db instance ->', db)
    say('starting plot -', op)
    eval(op.query).then((result) => {
      say('[PQL_OP_RESULT]', result)
      return callback
    })
  };

  return Plot;

})();

module.exports = new Plot;

