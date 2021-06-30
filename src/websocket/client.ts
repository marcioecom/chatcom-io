import { io } from '../http'

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id);
  socket.broadcast.emit('entrou');

  socket.on('disconnect', () => {
    socket.broadcast.emit('saiu');
    console.log('user disconnected ' + socket.id);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});