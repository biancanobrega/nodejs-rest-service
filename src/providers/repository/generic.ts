import { ModelsName } from '@commons/enums/database';
import { Database } from '@config/database';
import { Document, Model } from 'mongoose';

export abstract class GenericRepository<T extends Document> {
  private modelInstance: Model<T, {}>;
  constructor(name: ModelsName) {
    this.modelInstance = Database.getInstance().getModel(name) as Model<T, {}>;
  }

  public async findAll(fields?: string): Promise<T[]> {
    try {
      return this.model.find({}, fields);
    } catch (error) {
      // logger.error(`[GenericRepository - findAll]: \n ${error.message}`);
      // throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  public async add(document: T): Promise<T> {
    try {
      return await this.model.create(document);
    } catch (error) {
      // logger.error(`[GenericRepository - add]: \n ${error.message}`);
      // throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  public async findById(id: string, fields?: string): Promise<T> {
    try {
      return this.model.findOne({ _id: id }, fields);
    } catch (error) {
      // logger.error(`[GenericRepository - findById]: \n ${error.message}`);
      // throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  public update(id: string, document: T): Promise<T> {
    try {
      console.log('DOCUMENTO: ', document);
      return this.model
        .updateOne({ _id: id }, { $set: document }, { new: true })
        .exec();
    } catch (error) {
      // logger.error(`[GenericRepository - update]: \n ${error.message}`);
      // throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  protected remove(id: string) {
    try {
      return this.model.remove({ _id: id });
    } catch (error) {
      // logger.error(`[GenericRepository - remove]: \n ${error.message}`);
      // throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  protected findByParams(params: any): Promise<T[]> {
    try {
      return this.model.find(params).exec();
    } catch (error) {
      // logger.error(`[GenericRepository - findByParams]: \n ${error.message}`);
      // throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  protected get model(): Model<T> {
    return this.modelInstance;
  }
}
