import * as Server from './config/server';
import * as Database from './config/database';
import * as Configs from './config/config';

import ExampleRoute from './src/routes/example';

console.log(`Running enviroment ${process.env.NODE_ENV || 'dev'}`);

const serverConfigs = Configs.getServerConfigs();
const dbConfigs = Configs.getDatabaseConfigs();
const database = Database.init(dbConfigs);

//Starting Application Server
const server = Server.init();

server.listen(process.env.port || serverConfigs.port, function() {
  console.log('Servidor ON');
  ExampleRoute(server, database);
});
