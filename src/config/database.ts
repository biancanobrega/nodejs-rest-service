import { LogLevels, methodLog, parseFilePath } from '@spms-apps/ts-logger';
import { Connection, createConnection, Document, Model } from 'mongoose';
import { ModelsName } from '../commons/enums/database';
import { Endpoint } from '../commons/enums/endpoint';
import { IEndPointsAPI, IExampleDocument } from '../models/interfaces';
import { ExampleSchema } from '../models/schemas/example';
import { Config } from './config';

export class Database {
  public static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }

    return this.instance;
  }
  private static instance: Database;
  private config: IEndPointsAPI;
  private connection: Connection;
  private dbModels: Map<string, Model<Document>>;

  private constructor() {
    this.config = Config.getInstance().getConfig(Endpoint.ExampleMongo);
  }

  public async init(): Promise<Database> {
    this.connection = createConnection(this.config.url, {
      user: this.config.username,
      pass: this.config.password,
      useNewUrlParser: true
    });
    methodLog(
      LogLevels.info,
      parseFilePath(__filename),
      `Connected to database: ${this.config.url}`,
      'initialize'
    );
    this.connection.on('error', (error) => {
      methodLog(
        LogLevels.error,
        parseFilePath(__filename),
        `MongoDB error. Description: ${error}`,
        'init'
      );
    });
    this.dbModels = this.mapModels();
    return this;
  }

  public getModel(name: ModelsName): Model<Document> {
    const found: Model<Document> = this.dbModels.get(name);
    if (!found) {
      throw new Error('Model \'' + name + '\' not found');
    }
    return found;
  }

  private mapModels(): Map<string, Model<Document>> {
    const models = new Map<string, Model<Document>>();
    models.set(
      ModelsName.Example,
      this.connection.model<IExampleDocument>(ModelsName.Example, ExampleSchema)
    );
    return models;
  }
}
