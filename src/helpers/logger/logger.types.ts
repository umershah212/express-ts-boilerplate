import { LoggerOptions as WinstonConfig } from 'winston';

export type LoggerLevels = 'debug' | 'info' | 'warn' | 'error';
export type LogLevelOptions = 'off' | LoggerLevels;
export type LogFunction = (message: string, ...rest: unknown[]) => void;
export type BaseLoggerOptions = {
  config: unknown;
  filteredLogs?: string[];
};

export type NodeLogOptions = BaseLoggerOptions & {
  config?: WinstonConfig;
  ddApiKey?: string;
  env?: string;
};

export type LoggerInstance = {
  debug: LogFunction;
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
};
