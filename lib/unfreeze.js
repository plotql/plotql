
var socketio = require('./arctic_modules/socket.io');
var say = require('say.js').dev
var plot = require('./plot');
var path = require('path')

exports.use = function(server, db){
	const io = socketio.listen(server)
	io.sockets.on('connection', function(socket){
	  say("[Client connected]")

	  socket.on('query', function(input){
	  	console.log('incoming ->', input)
	  	var op = JSON.parse(JSON.stringify(input.data)) //.replace(/\\'/g, "'");


        /* Eval is used frequently here, be sure to sanitize/authorize incoming queries */
	  	say('operation', op)
	  	// var op = JSON.parse(query)

	  	var callback = io.emit(op.callback.channel, {data: op.callback.data})

	    plot.start(db, op, callback)

	  	return 
	  })

	  socket.on("disconnect", function(data){
	  	say("[Client left]", data, socket.id)
	  })
	});

	return "initialized"
}

// handle errors thrown
// handle = function(e){
//   return e
// }


