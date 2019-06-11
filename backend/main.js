// server.js
// load the server resource and route GET method
const server = require('server')
const { socket } = require('server/router')

// get server port from environment or default to 3000
const port = process.env.PORT || 3000

server({ port }, [
  socket('message', ctx => {
    // Send the message to every socket
    ctx.io.emit('message', ctx.data)
  }),
  socket('connect', ctx => {
    console.log('client connected', Object.keys(ctx.io.sockets.sockets))
    console.log(ctx)
    ctx.io.emit('count', {msg: 'HI U', count: Object.keys(ctx.io.sockets.sockets).length})
  }),
  socket('OracConnect', ctx => {
    console.log('Connect received!')
    ctx.io.emit('oracConnected', 1)
    ctx.io.emit('module', 'a1:Braids')
    ctx.io.emit('page', 'main')
    ctx.io.emit('P1Ctrl', 0.4)
    ctx.io.emit('P1Desc', 'Frequency')
    ctx.io.emit('P1Value', '100Hz')
    ctx.io.emit('P2Ctrl', 0.8)
    ctx.io.emit('P2Desc', 'Decay')
    ctx.io.emit('P2Value', '110Hz')
    ctx.io.emit('P3Ctrl', 0.8)
    ctx.io.emit('P3Desc', 'Decay')
    ctx.io.emit('P3Value', '110Hz')
    ctx.io.emit('P4Ctrl', 0.8)
    ctx.io.emit('P4Desc', 'Decay')
    ctx.io.emit('P4Value', '110Hz')
    ctx.io.emit('P5Ctrl', 0.8)
    ctx.io.emit('P5Desc', 'Decay')
    ctx.io.emit('P5Value', '110Hz')
    ctx.io.emit('text', 1, 'a1:braids')
    ctx.io.emit('text', 2, 'demo')
    ctx.io.emit('selectText', 2)
  }),
  socket('/P1Ctrl', ctx => {
    console.log('/P1Ctrl', ctx.data)
  }),
  socket('/P2Ctrl', ctx => {
    console.log('/P2Ctrl', ctx.data)
  }),
  socket('/P3Ctrl', ctx => {
    console.log('/P3Ctrl', ctx.data)
  }),
  socket('/P4Ctrl', ctx => {
    console.log('/P4Ctrl', ctx.data)
  }),
  socket('/P5Ctrl', ctx => {
    console.log('/P5Ctrl', ctx.data)
  }),
  socket('/P6Ctrl', ctx => {
    console.log('/P6Ctrl', ctx.data)
  }),
  socket('/P7Ctrl', ctx => {
    console.log('/P7Ctrl', ctx.data)
  }),
  socket('/P8Ctrl', ctx => {
    console.log('/P8Ctrl', ctx.data)
  }),
  socket('/PageNext', ctx => {
    console.log('/PageNext', ctx.data)
  }),
  socket('/ModuleNext', ctx => {
    console.log('/ModuleNext', ctx.data)
  }),
  socket('/PagePrev', ctx => {
    console.log('/PagePrev', ctx.data)
  }),
  socket('/ModulePrev', ctx => {
    console.log('/ModulePrev', ctx.data)
  })
])
  .then(() => console.log(`Server running at http://localhost:${port}`))
