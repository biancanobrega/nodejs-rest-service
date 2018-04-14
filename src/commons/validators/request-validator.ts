import * as Express from 'express';
import * as HTTP_CODES from 'http-status';
import * as Joi from 'joi';

export const validateBody = (validator: Joi.ObjectSchema) => (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    if (!validator.validate(req.body).error) {
      next();
    } else {
      throw Error('Invalid body.');
    }
  } catch (error) {
    console.log('[ExpressValidator - validateBody]: ', error);
    res.status(HTTP_CODES.BAD_REQUEST).send({ message: error.message });
  }
};

export const validateQuery = (validator: Joi.ObjectSchema) => (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    if (!validator.validate(req.query).error) {
      next();
    } else {
      throw Error('Invalid query.');
    }
  } catch (error) {
    console.log('[ExpressValidator - validateQuery]: ', error);
    res.status(HTTP_CODES.BAD_REQUEST).send({ message: error.message });
  }
};

export const validateParams = (validator: Joi.ObjectSchema) => (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    if (!validator.validate(req.params).error) {
      next();
    } else {
      throw Error('Invalid params.');
    }
  } catch (error) {
    console.log('[ExpressValidator - validateParams]: ', error);
    res.status(HTTP_CODES.BAD_REQUEST).send({ message: error.message });
  }
};
