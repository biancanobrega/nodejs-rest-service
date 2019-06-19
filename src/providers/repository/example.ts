import { ModelsName } from '@commons/enums/database';
import { IExampleDocument } from '@models/interfaces';
import { GenericRepository } from './generic';

export default class ExampleRepository extends GenericRepository<IExampleDocument> {
  constructor() {
    super(ModelsName.Example);
  }
}
