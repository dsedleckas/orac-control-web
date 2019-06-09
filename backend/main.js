// server.js
// load the server resource and route GET method
const server = require('server')
const { get, socket } = require('server/router')

// get server port from environment or default to 3000
const port = process.env.PORT || 3000

server({ port }, [
  get('/', ctx => '<h1>Hello you!</h1>'),
  socket('message', ctx => {
    // Send the message to every socket
    ctx.io.emit('message', ctx.data)
  }),
  socket('connect', ctx => {
    console.log('client connected', Object.keys(ctx.io.sockets.sockets))
    console.log(ctx.data)
    ctx.io.emit('count', {msg: 'HI U', count: Object.keys(ctx.io.sockets.sockets).length})
  }),
  socket('/Connect', ctx => {
    console.log('Connect received!');
    ctx.io.emit('/module', 'a1:Braids')
    ctx.io.emit('/page', 'main')
    ctx.io.emit('/P1Ctrl', 0.4)
    ctx.io.emit('/P1Desc', 'Frequency')
    ctx.io.emit('/P1Value', '100Hz')
    ctx.io.emit('/text', 1, 'a1:braids')
    ctx.io.emit('/text', 2, 'demo')
    ctx.io.emit('/selectText', 2)
  }),
  socket('/P1Ctrl', ctx => {
    console.log(ctx.data);
  })
])
  .then(() => console.log(`Server running at http://localhost:${port}`))