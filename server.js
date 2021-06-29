const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 3000
const app = express();
const server = createServer(app); // Criando protocolo http
const io = new Server(server); // Criando protocolo websocket

app.get('/', function (req, res) {
    return res.sendFile(__dirname + '/index.html');
});

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

server.listen(port, () => console.log(`Server on localhost:${port}`))
