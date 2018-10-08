import * as Mongoose from 'mongoose';

import { logger } from '../commons';
import { DataSchema } from '../models/';
import { Config } from './';

let databaseModels: IDatabase;

export interface IDatabase {
  example: Mongoose.Model<DataSchema.Example.IDoc>;
}

export const init = async () => {
  const exampleDatabaseConfig: Config.IDatabase = Config.getMicroserviceConfig().databases.example;
  (Mongoose as any).Promise = Promise;

  await Mongoose.createConnection(exampleDatabaseConfig.connectionString, {
    user: exampleDatabaseConfig.username,
    pass: exampleDatabaseConfig.password,
    useNewUrlParser: true
  })
    .then((mongoDb) => {
      databaseModels = {
        example: mongoDb.model<DataSchema.Example.IDoc>('Example', DataSchema.Example.schema)};
    })
    .catch((error) => logger.error(`Unable to connect to database: ${exampleDatabaseConfig.connectionString}`));
};

export const getDatabaseModels = (): IDatabase => databaseModels;
