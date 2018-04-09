import * as nconf from 'nconf';
import * as path from 'path';

//Read Configurations
const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: 'file',
    file: path.join(
      __dirname,
      `./env/config.${process.env.NODE_ENV || 'dev'}.json`
    )
  }
});

export interface IServerConfiguration {
  port: number;
}

export interface IDataConfiguration {
  connectionString: string;
}

export function getServerConfigs(): IServerConfiguration {
  return configs.get('server');
}

export function getDatabaseConfigs(): IDataConfiguration {
  return configs.get('database');
}
