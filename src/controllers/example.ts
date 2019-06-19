import {
  basicLog,
  httpReqLog,
  LogLevels,
  parseFilePath
} from '@spms-apps/ts-logger';
import { Request, Response } from 'express';
import * as HTTP_CODES from 'http-status';
import { Enums, Utils } from '../commons';
import { ExampleDto } from '../models/dtos/example';
import { Repository } from '../providers';
import { ExampleParser } from '../providers/helpers/example-parser';

export default class AppsController {
  private exampleRepository: Repository.ExampleRepository;

  constructor() {
    this.exampleRepository = new Repository.ExampleRepository();
  }

  public add = async (req: Request, res: Response) => {
    try {
      httpReqLog(LogLevels.info, parseFilePath(__filename), req);
      const example: ExampleDto = req.body;
      const result = await this.exampleRepository.add(
        ExampleParser.dtoToDocument(example)
      );
      res.status(HTTP_CODES.CREATED).send(ExampleParser.documentToDto(result));
    } catch (error) {
      basicLog(LogLevels.error, parseFilePath(__filename), error);
      // Criar validações de erros
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public update = async (req: Request, res: Response) => {
    try {
      const example: ExampleDto = req.body;
      example.id = req.params.id;
      const result = await this.exampleRepository.update(
        example.id,
        ExampleParser.dtoToDocument(example)
      );
      res.send(ExampleParser.documentToDto(result));
    } catch (error) {
      // Criar validações de erros
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public findAll = async (req: Request, res: Response) => {
    try {
      const query: Enums.InformationsFields[] = req.query.fields;

      const fields = query ? Utils.StringUtil.arrayToString(query) : undefined;
      const result = await this.exampleRepository.findAll(fields);
      typeof result !== undefined && result.length > 0
        ? res.send(result) /* res.send(ExampleHelper.documentsToDtos(result)) */
        : res.sendStatus(HTTP_CODES.NO_CONTENT);
    } catch (error) {
      // Criar validações de erros
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public findById = async (req: Request, res: Response) => {
    try {
      const appId: string = req.params.id;
      const query: Enums.InformationsFields[] = req.query.fields;

      const fields = query ? Utils.StringUtil.arrayToString(query) : undefined;
      const result = await this.exampleRepository.findById(appId, fields);
      result ? res.send(ExampleParser.documentToDto(result)) : res.sendStatus(HTTP_CODES.NO_CONTENT);
    } catch (error) {
      // Criar validações de erros
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
