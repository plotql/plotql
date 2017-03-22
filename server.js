// server.js

var fs = require('fs');
var path = require('path');
var http = require('http');
var exec = require('child_process').exec


var staticBasePath = './public';

var staticServe = function(req, res) {
    var fileLoc = path.resolve(staticBasePath);
    fileLoc = path.join(fileLoc, req.url);
    console.log("serving file location -->", fileLoc)
    fs.readFile(fileLoc, function(err, data) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            return res.end();
        }

        res.statusCode = 200;

        res.write(data);
        return res.end();
    });
};

var httpServer = http.createServer(staticServe);

httpServer.listen(4000, function(){
  console.log('server listening on port 4000')
});


// Bootstrap worker

handle = function(e){
  return e
}

// Monitor the queue worker connections

var child = exec('node ./lib/q-worker.js');
var child

child.stdout.on('data', function(data) {
  console.log('stdout: ' + data);
});

child.stderr.on('data', function(data) {
  console.log('stdout: ' + data);
});

child.on('close', function(code) {
  console.log('closing code: ' + code + 'restarting....');
  child = exec('node ./lib/q-worker.js');
});

module.exports = httpServer
