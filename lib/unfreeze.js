
var socketio = require('socket.io');
var say = require('say.js').prod;
var plot = require('./plot');

exports.use = function(server, db){
	const io = socketio.listen(server)
	io.sockets.on('connection', function(socket){
	  say("[Client connected]")

	  socket.on('query', function(input){
	  	say('incoming ->', input)
	  	var op = input.data.query //.replace(/\\'/g, "'");


	  	console.log('[PQL_OP]', op)

        let { callback } = op;

        let next = callback ? io.emit(op.callback.channel, { data: op.callback.data }) : () => {}

	    plot.start(db, op, next)

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


