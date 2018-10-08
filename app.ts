import * as App from './src';
import logger from './src/commons/logger';
import { Config, Database, Server } from './src/configurations';

console.log(`Running enviroment ${process.env.NODE_ENV || 'dev'}`);

const configs = Config.getMicroserviceConfig();
const server = Server.init();

server.listen(process.env.port || configs.server.port, async () => {
  await Database.init();
  logger.info('Servidor ON');
  App.init(server);
});
