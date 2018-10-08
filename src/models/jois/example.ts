import * as Joi from 'joi';
import { Enums } from '../../commons';

export const example = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  createdAt: Joi.date()
});

export const exampleId = Joi.object().keys({
  id: Joi.string().length(24)
});

export const fields = Joi.object().keys({
  fields: [
    Joi.string()
      .valid(Object.keys(Enums.Example.InformationsFields))
      .required(),
    Joi.array()
      .items(Joi.string().valid(Object.keys(Enums.Example.InformationsFields)))
      .required()
  ]
});
