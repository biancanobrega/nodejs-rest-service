import * as Server from './config/server';
import * as Database from './config/database';
import { getServerConfigs }  from './config/config';

import ExampleRoute from './src/routes/example';

console.log(`Running enviroment ${process.env.NODE_ENV || 'dev'}`);

//Starting Application Server
const server = Server.init();

server.listen(process.env.port || getServerConfigs().port, function() {
  console.log('Servidor ON');
  Database.init();
  ExampleRoute(server);
});
