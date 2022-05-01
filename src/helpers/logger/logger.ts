import { LoggerInstance, LoggerLevels, LogLevelOptions, NodeLogOptions } from './logger.types'
import BaseLogger from './base'
import { createLogger, format, transports } from 'winston'
import debug from 'debug'
const isProduction = process.env.NODE_ENV === 'production'
class NodeLogger extends BaseLogger<NodeLogOptions> {
  protected instance: LoggerInstance
  protected debugger: debug.IDebugger
  protected loggerNamespace: string = ''

  constructor(service: string, level: LogLevelOptions, options: NodeLogOptions) {
    super(service, level, options)

    const logger = createLogger({
      exitOnError: false,
      format: format.json(),
      transports: [new transports.Console()],
      level,
    })

    this.instance = logger

    this.debugger = debug(`${this.service}`)
  }

  logToConsole(message: string | object, componentName?: string, logContext = {}): void {
    const isObject = typeof message === 'object'
    let messageToLog = isObject ? JSON.stringify({ data: message, logContext }) : message
    if (componentName) {
      messageToLog = `[${componentName}] ${messageToLog}`
    }
    this.debugger(`[${this.namespace}] ${messageToLog}`)
  }

  protected log(level: LoggerLevels, message: string | object, componentName?: string, logContext = {}): void {
    if (isProduction) {
      super.log(level, message, componentName, logContext)
    }
    this.logToConsole(message, componentName, logContext)
  }

  debug(message: string | object, componentName?: string, logContext = {}): void {
    super.debug(message, componentName, logContext)
  }

  error(message: string | object, componentName?: string, logContext = {}): void {
    super.error(message, componentName, logContext)
  }

  info(message: string | object, componentName?: string, logContext = {}): void {
    super.info(message, componentName, logContext)
  }

  warn(message: string | object, componentName?: string, logContext = {}): void {
    super.warn(message, componentName, logContext)
  }
}

export default NodeLogger
