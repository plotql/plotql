
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path')
var say = require('say.js').dev

var Blend = (function() {
  function Blend() {}

  Blend.prototype.start = function(db,query) {

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
        say('run shell script -->>', executable)
        script = exec(executable);
        script.stdout.on('data', function(data) {
          console.log(data);
        });
        script.stderr.on('data', function(data) {
          console.log(data);
        });
      });
    });
  };

  return Blend;

})();

module.exports = new Blend;