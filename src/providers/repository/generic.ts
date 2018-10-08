import * as Mongoose from 'mongoose';
import { logger, Utils } from '../../commons';

export abstract class GenericRepository<T extends Mongoose.Document> {
  private _model: Mongoose.Model<T>;

  constructor(model: Mongoose.Model<T>) {
    this._model = model;
  }

  public async findAll(fields?: string): Promise<T[]> {
    try {
      return await this.model.find({}, fields);
    } catch (error) {
      logger.error(`[GenericRepository - findAll]: \n ${error.message}`);
      throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  public async add(document: T): Promise<T> {
    try {
      return await this.model.create(document);
    } catch (error) {
      logger.error(`[GenericRepository - add]: \n ${error.message}`);
      throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  public async findById(id: string, fields?: string): Promise<T> {
    try {
      return await this.model.findOne({ _id: id }, fields);
    } catch (error) {
      logger.error(`[GenericRepository - findById]: \n ${error.message}`);
      throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  public update(id: string, document: T): Promise<T> {
    try {
      return this.model.findByIdAndUpdate(
        { _id: id },
        { $set: document },
        { new: true }
      ).exec();
    } catch (error) {
      logger.error(`[GenericRepository - update]: \n ${error.message}`);
      throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  protected remove(id: string) {
    try {
      return this.model.remove({ _id: id });
    } catch (error) {
      logger.error(`[GenericRepository - remove]: \n ${error.message}`);
      throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  protected findByParams(params: any): Promise<T[]> {
    try {
      return this.model.find(params).exec();
    } catch (error) {
      logger.error(`[GenericRepository - findByParams]: \n ${error.message}`);
      throw Utils.ErrorUtil.generateErrorRepository(error);
    }
  }

  protected get model(): Mongoose.Model<T> {
    return this._model;
  }
}
