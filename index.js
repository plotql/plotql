"use strict";

var say = require('say.js').dev;

var socketio = require('./lib/unfreeze.js');

var kue = require('kue');
var q = kue.createQueue();


var server = require('./server')

var io = socketio.listen(server)


function tick(){
  q.create('new_message',{ timer: new Date()}).save( function(err){
    console.log(err)
  })
  io.sockets.emit('chat', (new Date()).toLocaleString());
  setTimeout(tick, 1000)
}

io.sockets.on('connection', function(socket){
  say("[Client connected]")
  tick()
});

