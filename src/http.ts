import 'reflect-metadata'
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors'
import { createServer } from "http";
import { Server } from "socket.io";

import path from "path"
import cors from 'cors'

import "./database"
import { router } from "./routes";

const origin = process.env.ORIGIN
const app = express();

const server = createServer(app); // Criando protocolo http
const io = new Server(server); // Criando protocolo websocket

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(cors({ origin: origin }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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
