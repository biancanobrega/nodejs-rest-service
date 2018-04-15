import * as Mongoose from 'mongoose';
import { IDataConfiguration, getDatabaseConfigs } from './config';
import { IExampleDocument, ExampleSchema } from '../src/models/example';

export let databaseModels: IDatabase;
export interface IDatabase {
  exampleModel: Mongoose.Model<IExampleDocument>;
}

export function init() {
  const config = getDatabaseConfigs();
  const connection = Mongoose.createConnection(config.connectionString);

  connection.on('error', () => {
    console.log(`Unable to connect to database: ${config.connectionString}`);
  });

  connection.once('open', () => {
    console.log(`Connected to database: ${config.connectionString}`);
  });

  databaseModels = {
    exampleModel: connection.model<IExampleDocument>('Example', ExampleSchema)
  };
}
