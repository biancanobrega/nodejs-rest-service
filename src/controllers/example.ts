import * as Express from 'express';
import * as HTTP_CODES from 'http-status';
import { IDatabase } from '../../config/database';
import { IExampleRequest, IExampleDocument } from '../models/example';

import * as ErrorUtil from '../commons/utils/error';
import ExampleDatabase from '../providers/database/example';

export default class ExampleController {
  private exampleDatabase: ExampleDatabase;

  constructor() {
    this.exampleDatabase = new ExampleDatabase();
  }

  public async add(req: Express.Request, res: Express.Response) {
    try {
      const description: string = req.body.description;

      let example: IExampleRequest = {
        description
      };

      const result = await this.exampleDatabase.add(
        example as IExampleDocument
      );
      res.status(HTTP_CODES.CREATED).send({ example: result });
    } catch (error) {
      res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
    }
  }

  public async findById(req: Express.Request, res: Express.Response) {
    try {
      const id = req.params.id;
      const result = await this.exampleDatabase.findById(id);

      if (result) {
        res.send({ example: result });
      } else {
        res.sendStatus(HTTP_CODES.NO_CONTENT);
      }
    } catch (error) {
      res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
    }
  }

  public async findAll(req: Express.Request, res: Express.Response) {
    try {
      const result = await this.exampleDatabase.findAll();
      if (typeof result !== undefined && result.length > 0) {
        res.send({ examples: result });
      } else {
        res.sendStatus(HTTP_CODES.NO_CONTENT);
      }
    } catch (error) {
      res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
    }
  }

  public async update(req: Express.Request, res: Express.Response) {
    try {
      const example: IExampleRequest = {
        description: req.body.description
      };
      const result = await this.exampleDatabase.update(
        req.params.id,
        example as IExampleDocument
      );
      res.send({ example: result });
    } catch (error) {
      res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
    }
  }

  public async remove(req: Express.Request, res: Express.Response) {
    try {
      const id = req.params.id;
      await this.exampleDatabase.remove(id);
      res.send({ message: 'Example successfully removed' });
    } catch (error) {
      res.status(ErrorUtil.generateHttpCode(error)).send(error.errors);
    }
  }
}
