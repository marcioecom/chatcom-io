import crypto from "crypto"
import { Socket } from 'socket.io'
import { io } from '../http'
import { CreateConnectionUseCase } from "../useCases/Connection/CreateConnectionUseCase"
import { CreateMessageUseCase } from "../useCases/Message/CreateMessageUseCase"

import { InMemorySessionStore } from "./sessionStore"

const sessionStore = new InMemorySessionStore();

const randomId = () => crypto.randomBytes(8).toString("hex");

interface ExtendedSocket extends Socket {
  username: string;
  userID: string;
  sessionID: string;
}

io.use((socket: ExtendedSocket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }

  const username = "Márcio"
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username
  next();
})

/* io.on('connection', (socket: ExtendedSocket) => {
  console.log('a user connected ' + socket.id);
  socket.broadcast.emit('entrou');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('saiu');
    console.log('user disconnected ' + socket.id);
  });
}); */

io.on("connection", (socket: ExtendedSocket) => {
  const createConnectionUseCase = new CreateConnectionUseCase()
  const createMessageUseCase = new CreateMessageUseCase()

  // persist session
  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  // emit session details
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // join the "userID" room
  socket.join(socket.userID);

  // fetch existing users
  const users = [];
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      userID: session.userID,
      username: session.username,
      connected: session.connected,
    });
  });
  socket.emit("users", users);

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  // forward the private message to the right recipient (and to other tabs of the sender)
  socket.on("private message", ({ content, to }) => {
    socket.to(to).to(socket.userID).emit("private message", {
      content,
      from: socket.userID,
      to,
    });

    createMessageUseCase.execute({
      user_sender: socket.userID,     /** It's temporary */
      user_receiver: to,              /** It's temporary */
      text: content
    })
  });

  // notify users upon disconnection
  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });
});