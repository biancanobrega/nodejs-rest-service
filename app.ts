import aliasConfig from './src/config/alias-config';
aliasConfig(__dirname);
import { Database, Server } from '@config/index';
import * as App from './src';

const bootstrap = async () => {
  const server = Server.getInstance();
  await server.init();
  await Database.getInstance().init();

  App.init(server.app);
};

bootstrap();
