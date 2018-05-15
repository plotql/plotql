How to use:

Redis must be installed and running, mongodb as well.

`var plotql = require('plotql')`

then, we tell it to use our server and which database to consume.

`plotql.use(server,db)`


use socket.io-client to emit to the `query` channel. It accepts 2 arguments, the query and a callback. Paste the inner data object into the example server to see how it works. 

````
io.emit('query', 

  { data: {
      query: 'db.users.find()',
      callback: { 
        channel: 'CREATE_USER',
        data: 'your message' 
      }
   } 

)
````

Plotql will emit the event back specified by the callback to the client or wherever you need it. We can listen in our highest level component for events in react and pass them down the chain using redux and graphql combination, keeping all clients up to date.


Motiviation:

Get data back to the client in an efficient manner, abstract the connection maintenance from the developer.
