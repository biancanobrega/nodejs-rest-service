import * as nconf from 'nconf';
import * as path from 'path';

// Read Configurations
const configs = new nconf.Provider({
  argv: true,
  env: true,
  store: {
    file: path.join(
      __dirname,
      `./env/config.${process.env.NODE_ENV || 'dev'}.json`,
    ),
    type: 'file',
  },
});

export interface IServer {
  port: number;
}

export interface IDatabase {
  connectionString: string;
  username: string;
  password: string;
}

export interface IMicroserviceConfig {
  server: IServer;
  databases: {
    example: IDatabase
  };
}

export function getMicroserviceConfig(): IMicroserviceConfig {
  return configs.get('microservice');
}
