var socketio = require('./arctic_modules/socket.io');
var say = require('say.js').dev
var blend = require('./blend');
var path = require('path')
var exec = require('child_process').exec

exports.use = function(server, db){
	const io = socketio.listen(server)
	io.sockets.on('connection', function(socket){
	  say("[Client connected]")

	  socket.on("query", function(data){
	  	var query = data.data.replace(/\\'/g, "'");

	  	/* TODO: Check if authorized to make this query */
	  	blend.start('use '+db,eval(query))
	  	say('[PLOTQL QUERY]', query)
	  })

	  socket.on("disconnect", function(data){
	  	say("[Client left]", data, socket.id)
	  })
	});

	return "initialized"
}

// handle errors thrown
handle = function(e){
  return e
}


