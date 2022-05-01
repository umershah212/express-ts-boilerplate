import { NodeLogOptions } from '../helpers/logger/logger.types';

declare global {
  namespace NodeJS {
    const shallow: any;
    const mount: any;
  }
  namespace Express {
    interface Request {
      app: Application;
    }
    namespace Multer {
      interface File {
        location?: string;
      }
    }
  }
}

declare module 'express' {
  interface Request {
    user?: any;
  }
}
export interface ProxyWhitelistEntry {
  swagger?: string;
}
export interface ClientGlobalVars {
  env: {};
}

export interface GlobalConfig {
  isDev: boolean;
  isProd: boolean;
  isTest: boolean;
  isStandalone: boolean;
  environment: string;
  pathPrefix: string;

  http: {
    port: number;
  };
  logger: NodeLogOptions;
}
