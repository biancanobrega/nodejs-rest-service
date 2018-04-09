import { Document, Model } from 'mongoose';
import * as ErrorUtil from '../../commons/utils/error';

export abstract class DatabaseService<T extends Document> {
  protected Model: Model<T>;

  constructor(model: Model<T>) {
    this.Model = model;
  }

  public async findAll(): Promise<T[]> {
    try {
      return await this.Model.find({}).exec();
    } catch (error) {
      console.log('[DataBaseService - findAll]: ', error);
      throw ErrorUtil.generateDatabaseError(error);
    }
  }

  public async add(document: T): Promise<T> {
    try {
      return await this.Model.create(document);
    } catch (error) {
      console.log('[DataBaseService - add]: ', error);
      throw ErrorUtil.generateDatabaseError(error);
    }
  }

  public async findById(id: string): Promise<T | null> {
    try {
      return await this.Model.findById(id).exec();
    } catch (error) {
      console.log('[DataBaseService - findById]: ', error);
      throw ErrorUtil.generateDatabaseError(error);
    }
  }

  public update(id: string, document: T): Promise<T | null> {
    try {
      return this.Model.findByIdAndUpdate(
        { _id: id },
        { $set: document },
        { new: true }
      ).exec();
    } catch (error) {
      console.log('[DataBaseService - update]: ', error);
      throw ErrorUtil.generateDatabaseError(error);
    }
  }

  public remove(id: string) {
    try {
      return this.Model.remove({ _id: id }).exec();
    } catch (error) {
      console.log('[DataBaseService - remove]: ', error);
      throw ErrorUtil.generateDatabaseError(error);
    }
  }
}
