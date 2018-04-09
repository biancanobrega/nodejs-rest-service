import { IDatabase } from "../../../config/database";
import { DatabaseService }  from './database';
import { IExampleDocument } from '../../models/example';

export default class ExampleDatabase extends DatabaseService<IExampleDocument>  {
  constructor (dataBase: IDatabase) {
    super(dataBase.exampleModel);
  }
}