import { NextFunction, Request, Response } from 'express';
import * as HTTP_CODES from 'http-status';
import * as Joi from 'joi';
import { Enums, logger } from '../index';

export default class RequestValidator {
  /**
   * Validates the specified part of a resuest (body, query, params...) based on a joi schema
   */
  public static validate = (
    schema: Joi.ObjectSchema | Joi.AlternativesSchema,
    field: Enums.Validator.FieldRequest
  ) => (req: Request, res: Response, next: NextFunction) => {
    schema
      .validate(req[field])
      .then((result) => {
        next();
      })
      .catch((error: Joi.ValidationError) => {
        const errorMessages = Object.keys(error.details).map((errorField) => {
          return { message: error.details[Number(errorField)].message };
        });
        logger.error(`[ExpressValidator - validateRequest]: ${error.message}`);
        res.status(HTTP_CODES.BAD_REQUEST).send({ errors: errorMessages });
      });
  }
}
