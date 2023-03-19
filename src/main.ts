import dotenv from 'dotenv'
dotenv.config()

import express, { Application, Request, Response } from 'express'
// import mongoose from 'mongoose'
import cors from 'cors'

import NodeLogger from './helpers/logger'
import { setupAWS } from '@helpers/index'
import { GlobalConfig } from './types/global'

const app: Application = express()
const loggerNamespace = 'WebServer'

const mountMiddleware = (logger: NodeLogger) => {
  logger.info('Mounting middleware', loggerNamespace)
  app.use(
    cors({
      origin: '*',
      exposedHeaders: ['access-token', 'refresh-token', 'content-type', 'content-length'],
    }),
  )
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
}

// const dbConnection = async (logger: NodeLogger) => {
//   try {
//     await mongoose.connect(
//       `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}`,
//       { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
//     )
//     logger.info('Connected to MongoDB', loggerNamespace)
//   } catch (e) {
//     logger.error(('Error when connecting to DB' + e) as string, loggerNamespace)
//     process.exit(1)
//   }
// }

const configureSettings = (config: GlobalConfig, logger: NodeLogger) => {
  logger.info('Configuring settings', loggerNamespace)
  app.disable('x-powered-by')
  app.enable('trust proxy')
  app.set('serverConfig', config)
  app.set('logger', logger)
}

const setupSocketController = () => {
  const server = require('http').Server(app)
  const io = require('socket.io')(server)
  app.use(function (req: any, res: any, next) {
    req.io = io
    next()
  })
  app.set('socketio', io)
  const { Sockets } = require('./routes')
  Sockets(app, io)
}

const setupRoutes = () => {
  const { Hello } = require('./routes')
  app.use('/api', Hello)
  app.get('/', (req: Request, res: Response) => res.status(200).send('Server healthy'))
}
export const boostrapServer = async (config: GlobalConfig) => {
  const logger = new NodeLogger(process.env.APP_NAME || 'boilerplate-backend', 'info', config.logger)
  app.set('logger', logger)
  logger.info('Bootstrapping server', loggerNamespace)
  configureSettings(config, logger)
  mountMiddleware(logger)
  // dbConnection(logger);
  setupAWS(logger)
  setupSocketController()
  setupRoutes()
  await startServer(config.http.port, logger)
}

export const startServer = async (port: number, logger: NodeLogger) => {
  const serverPort = process.env.PORT || port || 8000
  app.listen(serverPort, () => {
    logger.info(`Server listening on port: ${serverPort}`)
  })
}
