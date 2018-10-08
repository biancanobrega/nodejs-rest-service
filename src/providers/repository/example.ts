import { Database } from '../../configurations';
import { DataSchema } from '../../models';
import { GenericRepository } from './generic';

export default class ExampleRepository extends GenericRepository<DataSchema.Example.IDoc> {
  constructor() {
    super(Database.getDatabaseModels().example);
  }
}
