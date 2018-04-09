import * as Mongoose from "mongoose";
import { IDataConfiguration } from "./config";
import { IExampleDocument, ExampleSchema } from "../src/models/example";

export interface IDatabase {
  exampleModel: Mongoose.Model<IExampleDocument>;
}

export function init(config: IDataConfiguration): IDatabase {
  Mongoose.connect(config.connectionString);
  const connection = Mongoose.connection;

  connection.on('error', () => {
    console.log(`Unable to connect to database: ${config.connectionString}`);
  });

  connection.once('open', () => {
    console.log(`Connected to database: ${config.connectionString}`);
  });

  const exampleModel = connection.model<IExampleDocument> ('Example', ExampleSchema);

  return {
    exampleModel: exampleModel,
  };
}