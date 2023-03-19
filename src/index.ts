import { boostrapServer } from './main'
import { GlobalConfig } from './types/global'

process.on('uncaughtException', function (err) {
  // Handle the error gracefully
  console.log(err)
})

export const startServer = async () => {
  const config: GlobalConfig = {
    http: { port: 9000 },
    isDev: true,
    isStandalone: false,
    isTest: false,
    isProd: false,
    environment: 'development',
    pathPrefix: '/',
    logger: { config: { level: process.env.LOGGER_LEVEL || 'info' } },
  }
  await boostrapServer(config)
}

startServer()
