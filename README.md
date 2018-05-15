How to use:

A connection to a running mongo db instance is mandatory. 

### Installing
Include the following in your package.json
`  "plotql": "git+https://github.com/plotql/plotql" `
then you can run `npm install`

### Usage

`var plotql = require('plotql')`

next, we tell it to use our server and which database to consume.

`plotql.use(server,db)`

This handles all the socket configuration on the server, so you don't need to setup socket.io on node.

use socket.io-client to emit to the `query` channel. It accepts 2 arguments, the query and a callback. Paste the inner data object into the example server to see how it works. 

````
io.emit('query', { data: 

  { "query": "db.users.find()",
    "callback": { 
      "channel": "CREATE_USER",
      "data": "Query completed, push state or perform action" 
    }
  } 

})
````

Plotql will emit the event back specified by the callback to the client or wherever you need it. We can listen in our highest level component for events in react and pass them down the chain using redux and graphql combination, keeping all clients up to date.


Motiviation:

Get data back to the client in an efficient manner, abstract the connection maintenance from the developer.
