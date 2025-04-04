import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { createServer } from 'node:http'
import path from 'node:path'
import { Server } from 'socket.io'

import { MONGODB_URI } from './config/env'
import routes from './routes'

const app = express()

app.use(cors())

const httpServer = createServer(app)
const options = { cors: { origin: '*' } }
const io = new Server(httpServer, options)

io.on('connection', (socket) => {
  socket.on('connectRoom', (box: string) => {
    socket.join(box)
  })
})

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use((req: Request, _res: Response, next: NextFunction) => {
  req.io = io
  return next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')))

app.use(routes)

export default httpServer
