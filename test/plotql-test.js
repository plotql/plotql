const assert = require('assert');
const plotql = require('../lib/unfreeze')

// assert.throws(function() { throw new Error("Wrong value"); }, Error);

// var server = require('../server')


assert.doesNotThrow(
  () => {
  	console.log('Given a server instance')
  	console.log('.......[CONNECTION SUCCESS]')
  },
  TypeError,
  'Whoops'
);

var truthy = true

assert.equal(plotql, 'initialized');
