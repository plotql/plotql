// server.js

var fs = require('fs');
var path = require('path');
var http = require('http');
var plotql = require('plotql');

var staticBasePath = './public';

var staticServe = function(req, res) {
    var fileLoc = path.resolve(staticBasePath);
    fileLoc = path.join(fileLoc, req.url);
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

httpServer.listen(6377, function(){
  console.log('[SERVER] listening on port 6377')
});

var db = 'test'
plotql.use(httpServer, db)

module.exports = httpServer
