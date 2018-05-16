// server.js
const pmongo = require('promised-mongo')

var fs = require('fs');
var path = require('path');
var http = require('http');
var plotql = require('../.');

var staticBasePath = './public';

var staticServe = function(req, res) {
    var fileLoc = path.resolve(staticBasePath);
    fileLoc = path.join(fileLoc, req.url);
    fs.readFile(fileLoc, function(err, data) {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('Not found, try accessing /index.html ');
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


/* Establish db connection to pass to PlotQL, any collections being mutated or read need be declared here */
let db = pmongo('localhost/chain', {
  authMechanism: 'ScramSHA1'
}, ['users', 'blocks']);

/* Any authentication shall be established prior to the entry point below.
   Once established, authorized calls directly from the client are processed.
   PlotQL will fail, the server code shall be responsible for restarting in such cases */
plotql.use(httpServer, db.chain.db)


module.exports = httpServer
