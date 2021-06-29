import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"

const app = express()
const server = createServer(app) // Criando protocolo http
const io = new Server(server) // Criando protocolo websocket

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id)
  socket.on('disconnect', () => {
    console.log('user disconnected ' + socket.id)
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
    console.log('message: ' + msg);
  })

  socket.broadcast.emit('oi')
})

io.emit('some event', {
  someProperty: 'some value',
  otherProperty: 'other value'
}); // This will emit the event to all connected sockets

server.listen(3000, () => console.log('Server on localhost:3333'))
