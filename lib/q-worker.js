var kue = require('kue')
var q = kue.createQueue();

console.log('q loaded')

q.process('new_message', function(job,done){
  console.log('q worker handles new message', job.data )
  done()
});
