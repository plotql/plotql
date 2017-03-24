var socketio = require('socket.io');
var say = require('say.js').dev
var blend = require('./blend');
var path = require('path')

exports.use = function(server, db){
	const io = socketio.listen(server)
	io.sockets.on('connection', function(socket){
	  say("[Client connected]")

	  socket.on('query', function(data){
	  	var query = data.data.query //.replace(/\\'/g, "'");
                say('data ->', data)
	  	// TODO: Check if authorized to make this query 
	  	var callback = io.emit(data.data.callback.channel, {data: data.data.callback.data})

	    blend.start(db,query, callback)

	  	say('[PLOTQL QUERY]', query)

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


