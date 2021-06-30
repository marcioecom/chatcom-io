import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors'
import { createServer } from "http";
import { Server } from "socket.io";

import "./database"
import { router } from "./routes";

const app = express();

const server = createServer(app); // Criando protocolo http
const io = new Server(server); // Criando protocolo websocket

app.use(express.json())

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

export { server, io }
