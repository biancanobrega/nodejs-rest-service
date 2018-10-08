import { Request, Response } from 'express';
import * as HTTP_CODES from 'http-status';
import { Enums, logger, Utils } from '../commons';
import { DataSchema, Interfaces } from '../models';
import { Repository } from '../providers';

export default class AppsController {
  private exampleRepository: Repository.ExampleRepository;

  constructor() {
    this.exampleRepository = new Repository.ExampleRepository();
  }

  public add = async (req: Request, res: Response) => {
    try {
      const example: Interfaces.IExample = req.body;
      const result = await this.exampleRepository.add(
        example as DataSchema.Example.IDoc
      );
      res.status(HTTP_CODES.CREATED).send(result);
    } catch (error) {
      logger.error(`[AppsController - add: ${error.message}]`);
      res.status(Utils.ErrorUtil.generateCodeHttp(error)).send(error.message);
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      const exampleId: string = req.params.id;
      const example: Interfaces.IExample = req.body;
      const result = await this.exampleRepository.update(
        exampleId,
        example as DataSchema.Example.IDoc
      );
      res.send(result);
    } catch (error) {
      logger.error(`[AppsController - update: ${error.message}]`);
      res.status(Utils.ErrorUtil.generateCodeHttp(error)).send(error.message);
    }
  }

  public updateParams = async (req: Request, res: Response) => {
    try {
      const exampleId: string = req.params.id;
      const example: Interfaces.IExample = req.body;
      const result = await this.exampleRepository.update(
        exampleId,
        example as DataSchema.Example.IDoc
      );
      res.send(result);
    } catch (error) {
      logger.error(`[AppsController - updateParams: ${error.message}]`);
      res.status(Utils.ErrorUtil.generateCodeHttp(error)).send(error.message);
    }
  }

  public findAll = async (req: Request, res: Response) => {
    try {
      const query: Enums.Example.InformationsFields[] = req.query.fields;

      const fields = query ? Utils.StringUtil.arrayToString(query) : undefined;
      const result = await this.exampleRepository.findAll(fields);
      typeof result !== undefined && result.length > 0
        ? res.send(result)
        : res.sendStatus(HTTP_CODES.NO_CONTENT);
    } catch (error) {
      logger.error(`[AppsController - findAll: ${error.message}]`);
      res.status(Utils.ErrorUtil.generateCodeHttp(error)).send(error.message);
    }
  }

  public findById = async (req: Request, res: Response) => {
    try {
      const appId: string = req.params.id;
      const query: Enums.Example.InformationsFields[] = req.query.fields;

      const fields = query ? Utils.StringUtil.arrayToString(query) : undefined;
      const result = await this.exampleRepository.findById(appId, fields);
      result ? res.send(result) : res.sendStatus(HTTP_CODES.NO_CONTENT);
    } catch (error) {
      logger.error(`[AppsController - findAll: ${error.message}]`);
      res.status(Utils.ErrorUtil.generateCodeHttp(error)).send(error.message);
    }
  }
}
