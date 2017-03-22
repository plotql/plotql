var kue = require('kue')
var q = kue.createQueue();

var blend = require('./blend')

console.log('q-worker loaded')

q.process('new_message', function(job,done){
  console.log('q worker handles new message') //, job.data )
  // blend.start('db.users.findOneAndUpdate({},{ $set: {user: "tom"} })')
  done()
});
