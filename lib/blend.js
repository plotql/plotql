var exec = require('child_process').exec
var fs = require('fs');
var path = require('path')
var say = require('say.js').dev

var Blend = (function() {
  function Blend() {}

  Blend.prototype.start = function(db,query,callback) {

    return fs.readFile(__dirname+'/demo.js', 'utf8', function(err, data) {
      var result;
      if (err) {
        return console.log(err);
      }
      result = data.replace(/queryPlaceholder/g, query);
      result = result.replace(/dbPlaceholder/g, db);
      fs.writeFile(__dirname+'/dispatch.js', result, 'utf8', function(err) {
        var script;
        if (err) {
          return console.log(err);
        }
        var executable = 'mongo < '+__dirname+'/dispatch.js'
        script = exec(__dirname+'/dispatch.sh');
        script.stdout.on('data', function(data) {
          console.log('stdout -->', data);
          if(data.includes('bye')){
            return callback
          }
        });
        script.stderr.on('data', function(data) {
          console.log('stderr -->', data);
        });
      });
    });
  };

  return Blend;

})();
module.exports = new Blend;

